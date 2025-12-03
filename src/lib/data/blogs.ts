import { Blog } from "@/types/blog";

export const blogs: Blog[] = [
    {
        slug: "top-uses-cloth",
        title: "The Top 10 Uses for Cloth",
        author: "Shine Dezign",
        date: "March 10, 2025",
        cover: "/assets/image/woman.jpg",
        content: [
            {
                type: "text",
                value:
                    "Cloth is one of humanity’s oldest and most versatile inventions. Made from natural fibers like cotton, wool, silk, and linen, or synthetic materials such as polyester and nylon, cloth plays an essential role in everyday life. From the clothes we wear to the way we decorate our homes, cloth is woven—literally and figuratively—into the fabric of our lives.\n\nIn this blog post, we explore the top 10 uses for cloth and how this simple material has become a foundation for function, comfort, creativity, and style."
            },

            { type: "heading", value: "Clothing and Apparel" },
            {
                type: "text",
                value:
                    "The most obvious and widespread use of cloth is in clothing. From basic t-shirts to high-fashion gowns, cloth provides comfort, protection, and a canvas for personal expression. Different fabrics suit different climates and lifestyles—cotton is breathable and ideal for summer, while wool keeps us warm in winter. Whether casual or formal, clothing is one of the most intimate and impactful uses of cloth in our daily routines."
            },

            { type: "heading", value: "Home Furnishings" },
            {
                type: "text",
                value:
                    "Cloth is used extensively in home décor and furnishings. Curtains, upholstery, cushion covers, bedsheets, blankets, and tablecloths are all made from various textiles. These fabric items not only serve practical purposes—like privacy, insulation, and comfort—but also contribute to the aesthetic and personality of a living space."
            },
            { type: "image", value: "/assets/image/men.jpg" },
            { type: "image", value: "/assets/image/popular.jpg" },




            { type: "heading", value: "Cleaning and Hygiene" },
            {
                type: "text",
                value:
                    "Cloth plays a major role in cleaning and maintaining hygiene. From dishcloths and mop heads to face towels and microfiber dusters, different fabrics are chosen for their absorbent, soft, or scrub-friendly properties. Reusable cloth alternatives are also eco-friendly, helping reduce disposable waste in homes and businesses."
            },

            { type: "heading", value: "Bags and Accessories" },
            {
                type: "text",
                value:
                    "Cloth is a key material in crafting bags, pouches, belts, and even shoes. Canvas totes, cotton backpacks, and fabric wallets are durable and stylish, offering lightweight and sustainable alternatives to plastic and leather products. Fabric accessories also allow for endless customization and creativity in design."
            },

            { type: "heading", value: "Crafts and DIY Projects" },
            {
                type: "text",
                value:
                    "Crafters and DIY enthusiasts love working with cloth due to its versatility. Whether it's patchwork, embroidery, quilting, or making soft toys, cloth is the foundation of many art forms. Fabric scraps can be transformed into decorative items, bookmarks, coasters, or even upcycled into new pieces of clothing."
            },

            { type: "heading", value: "Medical and Sanitary Uses" },
            {
                type: "text",
                value:
                    "Cloth is essential in the medical field, where it's used for bandages, surgical gowns, masks, and more. Cotton gauze, for example, is soft and absorbent—ideal for dressing wounds. Reusable cloth diapers and sanitary pads are also becoming more popular as people seek eco-conscious hygiene alternatives."
            },

            { type: "heading", value: "Cultural and Religious Uses" },
            {
                type: "text",
                value:
                    "In many cultures, specific types of cloth have symbolic or spiritual importance. Think of ceremonial robes, prayer mats, or traditional garments worn during festivals or rituals. Fabrics like silk and handwoven cottons are often passed down through generations as part of heritage and identity."
            },

            { type: "heading", value: "Industrial and Technical Uses" },
            {
                type: "text",
                value:
                    "Beyond the household and fashion world, cloth is used in industrial settings. Fire-resistant fabric is used in uniforms for firefighters and factory workers. Textiles are also found in car interiors, tents, parachutes, and even space suits. The strength, flexibility, and durability of certain fabrics make them ideal for specialized tasks."
            },

            { type: "heading", value: "Packaging and Wrapping" },
            {
                type: "text",
                value:
                    "Cloth wrapping is a sustainable and beautiful alternative to paper or plastic packaging. In Japanese culture, “furoshiki” is a traditional wrapping cloth used to transport goods and gifts. Reusable cloth wraps and produce bags are also trending as people become more conscious of reducing single-use waste."
            },

            { type: "heading", value: "Artistic Expression" },
            {
                type: "text",
                value:
                    "Cloth is not just functional—it’s also a medium for art. Textile artists use it to create wall hangings, sculptures, and mixed media pieces. Techniques like tie-dye, batik, weaving, and printing turn ordinary fabric into extraordinary visual stories. Fashion designers, too, treat cloth as an artistic canvas, pushing boundaries with texture, form, and innovation."
            },

            { type: "heading", value: "Conclusion" },
            {
                type: "text",
                value:
                    "From the practicality of everyday use to the beauty of artistic expression, cloth proves to be one of the most valuable materials ever created. Its versatility, comfort, and sustainability make it a cornerstone in homes, industries, and cultures around the world. As we look toward a more sustainable future, cloth—especially natural and reusable types—will continue to play a critical role in our lifestyle choices.\n\nSo next time you fold your laundry, decorate your space, or wear your favorite outfit, take a moment to appreciate just how essential and impactful cloth really is."
            }

        ],
    },

    {
        slug: "mix-match-outfit",
        title: "How to Mix & Match Outfit for Daily Style",
        author: "Shine Dezign",
        date: "Nov 28, 2025",
        cover: "/assets/image/men.jpg",
        content: [
            { type: "heading", value: "Daily Outfit Tips" },
            { type: "text", value: "Here are simple techniques for matching outfits..." },
            { type: "image", value: "/assets/image/men.jpg" },
        ],
    },

    {
        slug: "mix-match-outfit",
        title: "How to Mix & Match Outfit for Daily Style",
        author: "Shine Dezign",
        date: "Nov 28, 2025",
        cover: "/assets/image/men.jpg",
        content: [
            { type: "heading", value: "Daily Outfit Tips" },
            { type: "text", value: "Here are simple techniques for matching outfits..." },
            { type: "image", value: "/assets/image/men.jpg" },
        ],
    },

    {
        slug: "minimalist-wardrobe",
        title: "Essential Wardrobe Guide for Minimalist Lovers",
        author: "Shine Dezign",
        date: "Nov 12, 2025",
        cover: "/assets/image/popular.jpg",
        content: [
            { type: "heading", value: "Minimalist Style Guide" },
            { type: "text", value: "A clean, modern approach to fashion..." },
            { type: "image", value: "/assets/image/popular.jpg" },
        ],
    },
];

export function getAllBlogs() {
    return blogs;
}

export function getBlog(slug: string) {
    return blogs.find((b) => b.slug === slug);
}

export function getRelatedBlogs(slug: string) {
    return blogs.filter((b) => b.slug !== slug).slice(0, 3);
}




