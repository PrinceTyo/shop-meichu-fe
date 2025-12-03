"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "./footer/footer";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Facebook, Send, MessageCircle, Mail } from "lucide-react";



import { useState } from "react";

export default function BlogDetail({ blog, related }: { blog: any; related: any[] }) {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  const submitComment = () => {
    if (!form.name || !form.comment) return;
    setForm({ name: "", email: "", comment: "" });
  };

  return (
    <div className="min-h-screen font-inter bg-white">

      {/* =============== HEADER =============== */}
      <div className="relative w-full h-[65vh] md:h-[85vh]">
        <Image src={blog.cover} alt={blog.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-4">

          <span className="text-neutral-300 text-sm tracking-wider">
            {blog.date}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl max-w-4xl mb-4">
            {blog.title}
          </h1>


        </div>
      </div>

      {/* =============== CONTENT FULL WIDTH =============== */}
      <div className="w-full">

        {blog.content.map((section: any, index: number) => (
          <div key={index} className="my-6 w-full">

            {/* HEADING – FULL WIDTH */}
            {section.type === "heading" && (
              <h2 className="text-3xl font-bold text-neutral-900 px-8">
                {section.value}
              </h2>
            )}

            {/* PARAGRAPH – FULL WIDTH */}
            {section.type === "text" && (
              <p className="text-md leading-relaxed text-neutral-900 px-8 max-w-full">
                {section.value}
              </p>
            )}
            {/* IMAGE SYSTEM — AUTO GROUPING */}
            {section.type === "image" && (() => {
              const next = blog.content[index + 1];

              // Jika next juga image → render 2 berdampingan
              if (next && next.type === "image") {
                return (
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-8 px-8 mt-10">
                    <Image
                      src={section.value}
                      alt=""
                      width={2000}
                      height={1200}
                      className="rounded-3xl object-cover w-full h-full md:h-[420px]"
                    />

                    <Image
                      src={next.value}
                      alt=""
                      width={2000}
                      height={1200}
                      className="rounded-3xl object-cover w-full h-full md:h-[420px]"
                    />
                  </div>
                );
              }
            })()}

          </div>
        ))}
      </div>


      {/* =============== AUTHOR SECTION =============== */}
      <div className="mx-auto px-8 mt-20">

        <Separator className="my-10" />

        <div className="flex items-center gap-4">
          <Image
            src="/assets/image/men.jpg"
            alt="Author"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-lg">By Zio Artis Fesbukk</p>
          </div>

          <div className="ml-auto flex items-center gap-4 text-neutral-600">
            <Link href="#" className="hover:text-black">
              <Facebook />
            </Link>



            <Link href="#" className="hover:text-black">
              <Send /> {/* Telegram icon */}
            </Link>

            <Link href="#" className="hover:text-black">
              <MessageCircle /> {/* WhatsApp icon */}
            </Link>

            <Link href="#" className="hover:text-black">
              <Mail />
            </Link>
          </div>
        </div>

        <Separator className="my-10" />
      </div>


      {/* =============== COMMENT ACCORDION =============== */}
      <div className="mx-auto px-6 mt-10 mb-28">
        <Accordion
          type="single"
          collapsible
          className="border rounded-4xl bg-neutral-50 p-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="mx-4 font-bold text-2xl flex items-center gap-3 p-3">
              <span>Leave a Comment</span>
            </AccordionTrigger>

            <AccordionContent className="px-6">
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="border p-3 rounded-4xl"
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="border p-3 rounded-4xl"
                />
              </div>

              <textarea
                placeholder="Comment"
                value={form.comment}
                onChange={(e) =>
                  setForm({ ...form, comment: e.target.value })
                }
                className="border p-3 rounded-4xl w-full h-32 mt-4"
              />

              {/* BUTTON POST COMMENT */}
              <button
                onClick={submitComment}
                className="mt-4 px-8 py-2 rounded-4xl border h-12 border-black bg-white text-black hover:bg-black hover:text-white transition"
              >
                Post comment
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>


      {/* =============== RELATED POSTS =============== */}
      <div className="w-full mt-12 px-4 pb-10 bg-gradient-to-b from-[#0e1204] to-black py-20">
        <h2 className="text-5xl text-white font-bold mb-16 text-center">
          Blogs Posts
        </h2>

        <Separator className="mb-16 py-0.1 bg-gray-400/15" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {related.slice(0, 3).map((b) => (
            <Link
              key={b.slug}
              href={`/blogs/${b.slug}`}
              className="
          group relative overflow-hidden
          border-white/5
        "
            >

              {/* ARROW ICON */}
              <div className="absolute">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </div>
              </div>

              {/* CONTENT TOP */}
              <div className=" pb-20">
                <p className="pl-34 text-sm text-neutral-400">
                  Shine Dezign &nbsp; | &nbsp; {b.date}
                </p>

                <h3 className="mt-8 font-bold text-white hover:text-neutral-400 text-xl leading-snug">
                  {b.title}
                </h3>

                <p className="mt-3 text-neutral-300 text-sm leading-relaxed line-clamp-2">
                  {b.desc || "Discover more insights inside this article."}
                </p>

              </div>



              {/* IMAGE (BOTTOM) */}
              <div
                className="
    relative w-full h-[260px] overflow-hidden rounded-t-3xl
    border border-transparent transition-all duration-500
    group-hover:-translate-y-3
  "
              >
                <Image
                  src={b.cover || b.image}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </div>

            </Link>
          ))}
        </div>
      </div>


      <Footer />
    </div>
  );
}
