import React from "react";
import { render } from "@testing-library/react";

import ConcertLocationMap from "./ConcertLocationMap";

test("renders concert list component", () => {
    const component = render(
        <ConcertLocationMap points={{ x: 1, y: 2 }} address={"test"} />
    );
    expect(component).not.toBeNull();
});
