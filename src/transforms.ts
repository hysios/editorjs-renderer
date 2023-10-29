export type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  image(block: block): string;
  simpleImage(block: block): string;
  quote(block: block): string;
  code(block: block): string;
  embed(block: block): string;
  faq(block: block): string;
};

type ListItem = {
  content: string;
  items: Array<ListItem>;
};

const alignType = ["left", "right", "center", "justify"]

export type block = {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    caption?: string;
    url?: string;
    file?: {
      url?: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    items?: Array<string> | Array<ListItem>;
    style?: string;
    code?: string;
    service?: "vimeo" | "youtube";
    source?: string;
    embed?: string;
    width?: number;
    height?: number;
    alignment?: "left" | "right" | "center" | "justify";
    align?: "left" | "right" | "center" | "justify";
  };
};

const transforms: transforms = {
  delimiter: () => {
    return `<br/>`;
  },

  header: ({ data, id }) => {
    if (!data.level) {
      return ``
    } else if (data.level === 1) {
    return `<div id=${id} style="text-align:center"><h${data.level}>${data.text}</h${data.level}></div>`;
    } else if (data.level < 4) {
      return `<div id=${id} style="padding-top: 15px"><h${data.level}>${data.text}</h${data.level}></div>`
    } else {
      return `<div id=${id} style="padding-top: 10px"><h${data.level}>${data.text}</h${data.level}></div>`
    }
  },

  paragraph: ({ data, id }) => {
    const paragraphAlign = data.alignment || data.align;

    if (typeof paragraphAlign !== 'undefined' && alignType.includes(paragraphAlign)) {
      return `<p style="text-align:${paragraphAlign};">${data.text}</p>`;
    } else {
      return `<p>${data.text}</p>`
    }
  },

  list: ({ data, id }) => {
    const listStyle = data.style === "unordered" ? "ul" : "ol";

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`;

        let list = "";
        if (item.items) list = recursor(item.items, listStyle);
        if (item.content) return `<li> ${item.content} </li>` + list;
      });

      return `<${listStyle}>${list.join("")}</${listStyle}>`;
    };

    return recursor(data.items, listStyle);
  },

  image: ({ data, id }) => {
    let alt = data.caption ? data.caption : "Image";
    if (data.caption === "") {
      return `<img src="${
        data.file && data.file.url ? data.file.url : data.url
      }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" /></br>`;
    }
    return `<img src="${
      data.file && data.file.url ? data.file.url : data.url
    }" alt="${alt}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
    <p class="image-caption">${data.caption}</p>`;
  },

  simpleImage: ({ data, id }) => {
    let url = data.url;
    let caption = data.caption ? data.caption : "Image";
    return `<img src="${url}" alt="${caption}" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
  <p class="image-caption">${caption}</p>`;
  },

  quote: ({ data, id }) => {
    return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
  },

  code: ({ data, id }) => {
    return `<pre><code>${data.code}</code></pre>`;
  },

  embed: ({ data, id }) => {
    switch (data.service) {
      case "vimeo":
        return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      case "youtube":
        return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      default:
        throw new Error(
          "Only Youtube and Vime Embeds are supported right now."
        );
    }
  },

  faq: ({ data, id }) => { // We will render FAQ blocks as accordions elsewhere
    return ""
  },
};

export default transforms;
