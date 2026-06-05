import { render } from "@testing-library/react";
import NoiseOverlay from "../../components/NoiseOverlay";

describe("NoiseOverlay", () => {
  it("renderiza el div con clases y estilos", () => {
    const { container } = render(<NoiseOverlay />);
    const div = container.firstChild as HTMLElement;
    expect(div).toBeInTheDocument();
    expect(div.className).toContain("fixed");
    expect(div.className).toContain("pointer-events-none");
    expect(div.style.backgroundRepeat).toBe("repeat");
    expect(div.style.backgroundSize).toBe("128px 128px");
    expect(div.style.opacity).toBe("0.04");
  });
});
