interface SizeProps {
  name: string;
  slug: string;
  quantity: string;
  price: number;
}

export function parseSizeOptions(sizeOptions: SizeProps[]) {
  const parsedOptions = sizeOptions.map((size) => {
    return {
      label: size.quantity,
      value: size.quantity,
    };
  });

  return parsedOptions.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });
}
