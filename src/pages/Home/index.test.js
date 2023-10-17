import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { useData } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    // Fix Typo
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // test implementation
    render(<Home />);
    screen.getByTestId("services-list");
    screen.getAllByTestId("service-item");
  });
  it("a list a people is displayed", () => {
    // test implementation
    render(<Home />);
    screen.getByTestId("peoples-list");
    screen.getAllByTestId("people-item");
  });
  it("a footer is displayed", () => {
    // test implementation
    render(<Home />);
    screen.getByTestId("footer");
  });
  // test implementation
  it('while waiting for les last event card, this message is displayed : "Waiting last event..."', async () => {
    render(<Home />);
    await screen.findByText("Waiting last event...");
  });

  it("an event card, with the last event, is displayed", async () => {
    // test implementation
    render(<Home />);
    setTimeout(() => {
      () => {
        const { last } = useData();
        screen.findByTestId("last-event");
        screen.findByText(last.title);
      };
    }, 100);
  });
});
