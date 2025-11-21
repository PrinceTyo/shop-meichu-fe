"use client";

import { useRef } from "react";
import TrendingProduct from "../card/trending-product";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TrendingSection() {
  const sectionTrending = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionTrending.current) return;

      gsap.set(".trending", { opacity: 1, x: 0 });
      gsap.set(".products", { opacity: 1, x: 0 });
      gsap.set(".trendCard", { perspective: 1000 });

      const cards = document.querySelectorAll(".trendingCard");
      const totalCards = cards.length;
      const spacing = -160;

      cards.forEach((card, index) => {
        const offset = (index - (totalCards - 1) / 2) * spacing;

        gsap.set(card, {
          opacity: 0,
          rotateY: 85,
          scale: 0.5,
          x: offset,
          transformOrigin: "center center",
        });
      });

      gsap.to(".trending", {
        x: -600,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });

      gsap.to(".products", {
        x: 600,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });

      gsap.to(".trendingCard", {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        x: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });
    },
    { scope: sectionTrending }
  );

  const products = [
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 2,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 3,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 4,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 5,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 6,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 7,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
    {
      id: 8,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front:
          "https://media.discordapp.net/attachments/1407219298103201852/1440909139894206464/sekarang_1__1_-removebg-preview.png?ex=69208775&is=691f35f5&hm=4cafe3a641fb47045f27d943860876b4d599d454756e3e5181e8b00cdb7142ab&=&format=webp&quality=lossless",
        hover:
          "https://media.discordapp.net/attachments/1407219298103201852/1440929646093799514/ARYA_COOKED__-removebg-preview.png?ex=69209a8e&is=691f490e&hm=5b7e08038ccb8c86f06c8a952903ad725b362aa4dc105ff7641652e21ca2bfbe&=&format=webp&quality=lossless",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Red",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244584213614663/ChatGPT_Image_Nov_21__2025__08_47_57_AM-removebg-preview.png?ex=6921171d&is=691fc59d&hm=0e74b57cdd1238842f84d2b25bea105591c8ffceb43a11e802b083589c9cf976&=&format=webp&quality=lossless",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329279623359/Gambar_WhatsApp_2025-08-06_pukul_12.26.59_9c8a4118-removebg-preview.png?ex=692116e1&is=691fc561&hm=168e48e12024dda36e2c9deeda624d066e51570b0841be14f1fe95e722221c8c&=&format=webp&quality=lossless&width=414&height=552",
        },
        {
          label: "Green",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329950580796/ABS2GSlvBBqsXngDzvkzwprO0BpSukz0ydJ0LFvtgKNGx5o2IzfsdlrixM_t0suwV1aVdvEzmj4UhF3R318WKE7B4fXcizihDrM6ScrmmENYHfvAIYIWTrZRiXy8qMGUF-LLB3QMr-yV1kAChDQT-Q924rFBogk5VOWWuvKsGrKPZWWGgh-ns1024-rj-removebg-pr.png?ex=692116e1&is=691fc561&hm=f0fa5543a1882c69a82cc7362c9587e29042449da01a96b79ebe391aff62590d&=&format=webp&quality=lossless&width=368&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
        {
          label: "Blue",
          img: "https://media.discordapp.net/attachments/1407219298103201852/1441244329653043363/Gambar_WhatsApp_2024-08-29_pukul_15.41.05_88aa088f-removebg-preview.png?ex=692116e1&is=691fc561&hm=ac86de375c817f088494b13ff6a84a4a39975acf48ca39700ca12d659727dfc4&=&format=webp&quality=lossless&width=415&height=552",
        },
      ],
    },
  ];

  return (
    <div
      ref={sectionTrending}
      className="trending-wrapper bg-white mt-200 relative flex items-center justify-center min-h-86"
    >
      <div className="absolute text-[7rem] flex items-center justify-center">
        <h1 className="trending">TRENDING</h1>
        <h1 className="products">PRODUCTS</h1>
      </div>
      <div className="trendCard absolute bg-transparent flex items-center justify-center gap-5 p-6 mb-6">
        {products.map((p) => (
          <TrendingProduct key={p.id} product={p} className="trendingCard" />
        ))}
      </div>
    </div>
  );
}
