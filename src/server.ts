import { app } from '.';

const PORT = process.env.PORT || 3333;

app.listen(3500, () => {
  console.log(`Server running on port ${PORT}...`);
});
