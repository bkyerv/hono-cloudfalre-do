import { Hono } from "hono";

interface Env {
  Bindings: {
    COUNTER: DurableObjectNamespace;
  };
}

const app = new Hono<Env>();

app.get("*", async (c) => {
  const id = c.env.COUNTER.idFromName("A");
  const obj = c.env.COUNTER.get(id);

  const resp = await obj.fetch(c.req.url);

  //   if (resp.status === 404) {
  //     return c.text("404 Not found", 404);
  //   }
  const response = await resp.text();
  const count = parseInt(response);

  c.text(`Count is ${count}`);
});

export default app;
