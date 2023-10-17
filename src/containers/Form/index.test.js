import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";
// La description du test ne correspond pas au test effectué
describe("When Form is created", () => {
  it("fields email, Nom, Prénom, Personnel / Entreprise et message are displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    // Fix Typo
    await screen.findByText("Personnel / Entreprise");
    // add field message
    await screen.findByText("Message");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
