
export function splitDescriptionIntoParagraphs(text: string): [string, string] {
    if (!text) return ["", ""];

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    const midPoint = Math.ceil(sentences.length / 2);
    const firstPart = sentences.slice(0, midPoint).join(" ").trim();
    const secondPart = sentences.slice(midPoint).join(" ").trim();

    return [firstPart, secondPart];
}