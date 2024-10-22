"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getMultipleRecordsV2,
  getPrimaryDomain,
  Record as RecordV2,
} from "@bonfida/spl-name-service";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ReadOnlyInput } from "@/components/ReadOnlyInput";

type RecordValues = Partial<Record<RecordV2, string>>;

const RECORDS = [
  RecordV2.Pic,
  RecordV2.Url,
  RecordV2.Twitter,
  RecordV2.Telegram,
];

export default function DomainLookupPage() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [primaryDomain, setPrimaryDomain] = useState("");
  const [recordValues, setRecordValues] = useState<RecordValues>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDomainFromPubkey = async () => {
      if (!publicKey) {
        setPrimaryDomain("");
        setRecordValues({});
        return;
      }

      try {
        setLoading(true);

        // Get primary domain using account public key
        const { reverse: domain, stale } = await getPrimaryDomain(
          connection,
          publicKey
        );

        if (!stale) {
          // Get RecordV2 data from domain name
          const recordResults = await getMultipleRecordsV2(
            connection,
            domain,
            RECORDS,
            {
              deserialize: true,
            }
          );

          const newRecordValues = recordResults.reduce((prev, curr) => {
            if (curr) {
              return {
                ...prev,
                [curr.record]: curr.deserializedContent,
              };
            }
            return prev;
          }, {});

          setPrimaryDomain(domain);
          setRecordValues(newRecordValues);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    getDomainFromPubkey();
  }, [connection, publicKey]);

  return (
    <div className="grid min-h-screen grid-rows-[1fr_20px] items-center justify-items-center py-12">
      <main className="row-start-1 flex w-[480px] flex-col items-center justify-center gap-y-8">
        {recordValues.pic ? (
          <Image
            className="mb-2 size-24 rounded-full"
            src={recordValues.pic}
            alt="Next.js logo"
            width={24}
            height={24}
          />
        ) : (
          <Image
            aria-hidden
            src={recordValues.pic || "/logo.svg"}
            alt="Sns logo"
            width={33}
            height={38}
            className={`mb-2 h-24 w-auto ${
              loading ? "animate-spin" : "animate-none"
            }`}
          />
        )}

        <WalletMultiButton />

        <Divider />

        <div className="grid w-full gap-y-4">
          <ReadOnlyInput
            label="primary domain"
            value={`${primaryDomain}.sol`}
          />
          {RECORDS.map((r) => (
            <ReadOnlyInput key={r} label={r} value={recordValues[r] || ""} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
