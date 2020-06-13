import { setupWorker, rest } from "msw";
import { mockConcerts } from "./__mock__/data";

// 2. Define request handlers and response resolvers
const worker = setupWorker(
    rest.get("https://fake.api.dev/concerts", (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(202, "Mocked status"),
            ctx.json(mockConcerts)
        );
    })
);

// 3. Start the Service Worker
worker.start();
