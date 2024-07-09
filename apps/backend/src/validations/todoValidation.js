const zod = require('zod');

const stringSchema = zod.string().min(3);
const dateSchema = zod.date();

const todoValidation = (data) => {
  const titleResponse = stringSchema.safeParse(data.title);
  if (!titleResponse.success) {
    return {
      error: 'Title must contain atleast 3 characters.',
    };
  }

  const descriptionResponse = stringSchema.safeParse(data.description);
  if (!descriptionResponse.success) {
    return {
      error: 'Description must contain atleast 3 characters.',
    };
  }

  const startDateResponse = dateSchema.safeParse(new Date(data.startDate));
  if (!startDateResponse.success) {
    return {
      error: 'Please enter a valid date.',
    };
  }

  const dueDateResponse = dateSchema.safeParse(new Date(data.dueDate));
  if (!dueDateResponse.success) {
    return {
      error: 'Please enter a valid date.',
    };
  }
}

module.exports = todoValidation;
