import { NextRequest } from "next/server";
type PostObj = {};
async function validateRequest(request: NextRequest, HTTP: string) {
  let post = {
    id: "",
  };
  try {
    console.log(request);
    post = await request.json();
    console.log("line 10", post);
    switch (HTTP) {
      // Check if its missing any required properties (for each method)

      case "DELETE": {
        if (!post.id) {
          throw new Error(`\nInvalid 'post' request body:
                        id?               ${post.id}? "OK" : "MISSING"}
                    `);
        }
        break;
      }
      default: {
        throw new Error("Unknown HTTP method");
      }
    }
  } catch (err) {
    // Error if missing any properties
    console.log(err);
    return err as Error;
  }
  // Will return if valid
  return post;
}
export { validateRequest };
