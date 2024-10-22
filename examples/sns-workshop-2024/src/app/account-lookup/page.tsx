"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getMultipleRecordsV2,
  Record as RecordV2,
  resolve,
} from "@bonfida/spl-name-service";
import { useConnection } from "@solana/wallet-adapter-react";
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

export default function AccountLookupPage() {
  const { connection } = useConnection();
  const [domainName, setDomainName] = useState("");
  const [account, setAccount] = useState("");
  const [recordValues, setRecordValues] = useState<RecordValues>({});
  const [loading, setLoading] = useState(false);

  const handleInput = async (domain: string) => {
    try {
      setLoading(true);

      // Resolve owner public key from domain name
      const pubkey = await resolve(connection, domain);

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

      setAccount(pubkey.toBase58());
      setRecordValues(newRecordValues);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

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
            src="/logo.svg"
            alt="Sns logo"
            width={33}
            height={38}
            className={`mb-2 h-24 w-auto ${
              loading ? "animate-spin" : "animate-none"
            }`}
          />
        )}
        <div className="w-full">
          <input
            value={domainName}
            placeholder=".sol domain"
            className="h-10 w-full rounded-full p-4 text-black/80 outline-none"
            onChange={(e) => {
              setDomainName(e.target.value);
              setAccount("");
              setRecordValues({});
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInput(domainName);
              }
            }}
            disabled={loading}
          />
        </div>

        <Divider />

        <div className="grid w-full gap-y-4">
          <ReadOnlyInput label="account" value={account || ""} />
          {RECORDS.map((r) => (
            <ReadOnlyInput key={r} label={r} value={recordValues[r] || ""} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
