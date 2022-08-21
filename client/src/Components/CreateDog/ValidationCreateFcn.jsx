export default function validation(input, name, errors, repeated) {
  if (repeated) return {...errors, name: "This dog already exist"};
  if (input[name] === "") return {...errors, [name]: "This input must be completed"};
  if (name !== "image") {
    if (name !== 'name' && Number(input[name]) < 0)
      return { ...errors, [name]: "Can't put a negative number" };

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

//   if (input.name === "") error.name = "This input must be completed";
//   if (input.minHeight === "") error.minHeight = "This input must be completed";
//   if (input.maxHeight === "") error.maxHeight = "This input must be completed";
//   if (input.minWeight === "") error.minWeight = "This input must be completed";
//   if (input.maxWeight === "") error.maxWeight = "This input must be completed";
//   if (input.minLife_span === "")
//     error.minLife_span = "This input must be completed";
//   if (input.maxLife_span === "")
//     error.maxLife_span = "This input must be completed";
//   if (Number(input.minHeight) < 0)
//     error.minHeight = "Can't put a negative number";
//   if (Number(input.maxHeight) < 0)
//     error.maxHeight = "Can't put a negative number";
//   if (Number(input.minWeight) < 0)
//     error.minWeight = "Can't put a negative number";
//   if (Number(input.maxWeight) < 0)
//     error.maxWeight = "Can't put a negative number";
//   if (Number(input.minLife_span) < 0)
//     error.minLife_span = "Can't put a negative number";
//   if (Number(input.maxLife_span) < 0)
//     error.maxLife_span = "Can't put a negative number";

//   if (
//     Number(input.maxHeight) < Number(input.minHeight) &&
//     input.minHeight !== ""
//   ) {
//     error.maxHeight = `It must be more than ${input.minHeight}`;
//   }
//   if (
//     Number(input.maxWeight) < Number(input.minWeight) &&
//     input.minWeight !== ""
//   ) {
//     error.maxWeight = `It must be more than ${input.minWeight}`;
//   }
//   if (
//     Number(input.maxLife_span) < Number(input.minLife_span) &&
//     input.minLife_span !== ""
//   ) {
//     error.maxLife_span = `It must be more than ${input.minLife_span}`;
//   }
//   return error;
// }
