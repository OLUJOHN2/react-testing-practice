// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import TodoList from "../../src/components/TodoList";

// describe("TodoList", () => {
//   it("renders TodoList with an input and a button", () => {
//     render(<TodoList />);

//     expect(screen.getByPlaceholderText("Enter new todo")).toBeInTheDocument();
//     expect(screen.getByText("Add Todo")).toBeInTheDocument();
//   });

//   it("can add a todo item", async () => {
//     render(<TodoList />);

//     const input = screen.getByPlaceholderText("Enter new todo");
//     const button = screen.getByText("Add Todo");

//     await userEvent.type(input, "New Todo");
//     await userEvent.click(button);

//     expect(screen.getByText("New Todo")).toBeInTheDocument();
//   });

//   it("can mark a todo as completed", async () => {
//     render(<TodoList />);

//     const input = screen.getByPlaceholderText("Enter new todo");
//     const button = screen.getByText("Add Todo");

//     await userEvent.type(input, "New Todo");
//     await userEvent.click(button);

//     const checkbox = screen.getByRole("checkbox");
//     expect(checkbox).not.toBeChecked();

//     await userEvent.click(checkbox);
//     expect(checkbox).toBeChecked();

//     const todoItem = screen.getByText("New Todo");
//     expect(todoItem).toHaveStyle("text-decoration: line-through");
//   });

//   it("can delete a todo item", async () => {
//     render(<TodoList />);

//     const input = screen.getByPlaceholderText("Enter new todo");
//     const button = screen.getByText("Add Todo");

//     await userEvent.type(input, "New Todo");
//     await userEvent.click(button);

//     const deleteButton = screen.getByText("Delete");
//     await userEvent.click(deleteButton);

//     await waitFor(() => {
//       expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
//     });
//   });
// });

import { render, screen } from "@testing-library/react";
import TodoList from "../../src/components/TodoList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("TodoList", () => {
  it("should render a list of todos", async () => {
    render(<TodoList />);
    const todos = await screen.findAllByRole("listitem");
    expect(todos.length).toBeGreaterThan(0);
  });

  it("should render no todos available if no todo is found", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/todos", () =>
        HttpResponse.json([]),
      ),
    );

    render(<TodoList />);
    const noTodos = await screen.findByText(/no todos/i);
    expect(noTodos).toBeInTheDocument();
  });

  it("should render a loading if products are loading", () => {
    render(<TodoList />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });
});
