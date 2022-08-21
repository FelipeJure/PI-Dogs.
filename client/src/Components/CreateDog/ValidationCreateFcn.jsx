export default function validation(input, name, errors, repeated) {
  if (repeated) return { ...errors, name: "This dog already exist" };
  if (input[name] === "")
    return { ...errors, [name]: "This input must be completed" };
  if (name !== "image") {
    if (name !== "name" && Number(input[name]) < 0)
      return { ...errors, [name]: "Can't put a negative number" };
    if (name.includes("max")) {
      let minValue = name.replace("max", "min");
      let minValueNumber = input[minValue];
      if (Number(input[name]) < minValueNumber && minValueNumber !== "")
        return { ...errors, [name]: `It must be more than the minimum` };
      else {
        if (errors[minValue] === `It must be less than the maximum`)
          errors = { ...errors, [minValue]: "" };
      }
    }
    if (name.includes("min")) {
      let maxValue = name.replace("min", "max");
      let maxValueNumber = input[maxValue];
      if (Number(input[name]) > maxValueNumber && maxValueNumber !== "")
        return { ...errors, [name]: `It must be less than the maximum` };
      else {
        if (errors[maxValue] === `It must be more than the minimum`)
          errors = { ...errors, [maxValue]: "" };
      }
    }
  }
  return { ...errors, [name]: "" };
}
