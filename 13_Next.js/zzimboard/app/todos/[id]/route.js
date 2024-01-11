export async function GET(req, { params }) {
  // console.log(obj);
  // { params: { id: '20' } }
  // Dynamic Route

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await res.json();
  return Response.json({todo});
}