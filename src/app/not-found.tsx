"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { Title } from "rizzui";
import Button from "@/components/form/button";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export const metadata: Metadata = {
  title: "Page Not Found | KADA",
};

export default function NotFound() {
  const router = useRouter();
  return (<div className="flex min-h-screen flex-col bg-[#F8FAFC]">
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Title
          as="h1"
          className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
        >
          Sorry, the page not found
        </Title>
        <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
          It is looking like you may have taken a wrong turn. Don&apos;t
          worry... it
          <br className="hidden sm:inline-block" />
          happens to the best of us. Just click the button below to get back
          on track.
        </p>

        <Button
          className="mt-8 !px-4 !py-2 !rounded-full !w-fit"
          handleClick={() => router.back()}
        >
          <span className="flex gap-2 items-center"><ArrowLeftIcon className="w-4" /> <span>Go Back</span></span>
        </Button>
      </div>
    </div>
  </div>);
}
