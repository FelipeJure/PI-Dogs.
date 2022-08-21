export default function validation(input, name, errors, dog) {
    if (name !== "image") {
      
      if (name !== 'name' && Number(input[name]) < 0)
        return { ...errors, [name]: "Can't put a negative number" };
      
      
        if (
        Number(input.minHeight) > Number(dog.height.split(" - ")[1]) &&
        input.maxHeight === ""
      ) {
        if (name === "minHeight")
          return {
            ...errors,
            minHeight: `It must be less than ${dog.height.split(" - ")[1]}`,
          };
      } else {
        errors = { ...errors, minHeight: "" };
      }
      if (
        input.maxHeight !== '' && Number(input.maxHeight) < Number(dog.height.split(" - ")[0]) &&
        input.minHeight === ""
      ) {
        if (name === "maxHeight")
          return {
            ...errors,
            maxHeight: `It must be more than ${dog.height.split(" - ")[0]}`,
          };
      } else {
        errors = { ...errors, maxHeight: "" };
      }
      if (
        Number(input.minWeight) > Number(dog.weight.split(" - ")[1]) &&
        input.maxWeight === ""
      ) {
        if (name === "minWeight")
          return {
            ...errors,
            minWeight: `It must be less than ${dog.weight.split(" - ")[1]}`,
          };
      } else {
        errors = { ...errors, minWeight: "" };
      }
      if (
        input.maxWeight !== '' && Number(input.maxWeight) < Number(dog.weight.split(" - ")[0]) &&
        input.minWeight === ""
      ) {
        if (name === "maxWeight")
          return {
            ...errors,
            maxWeight: `It must be more than ${dog.weight.split(" - ")[0]}`,
          };
      } else {
        errors = { ...errors, maxWeight: "" };
      }
      if (
        Number(input.minLife_span) >
          Number(dog.life_span.split(" - ")[1].slice(0, -6)) &&
        input.maxLife_span === ""
      ) {
        if (name === "minLife_span")
          return {
            ...errors,
            minLife_span: `It must be less than ${dog.life_span
              .split(" - ")[1]
              .slice(0, -6)}`,
          };
      } else {
        errors = { ...errors, minLife_span: "" };
      }
      if (
        input.maxLife_span !== '' && Number(input.maxLife_span) < Number(dog.life_span.split(" - ")[0]) &&
        input.minLife_span === ""
      ) {
        if (name === "maxLife_span")
          return {
            ...errors,
            maxLife_span: `It must be more than ${dog.life_span.split(" - ")[0]}`,
          };
      } else {
        errors = { ...errors, maxLife_span: "" };
      }
      if (name.includes("max")) {
        let minValue = name.replace("max", "min");
        minValue = input[minValue];
        if (Number(input[name]) < minValue && minValue !== "")
          return { ...errors, [name]: `It must be more than ${minValue}` };
      }
      if (name.includes("min")) {
        let maxValue = name.replace("min", "max");
        maxValue = input[maxValue];
        if (Number(input[name]) > maxValue && maxValue !== "")
          return { ...errors, [name]: `It must be less than ${maxValue}` };
      }
    }
    return { ...errors, [name]: "" };
  }