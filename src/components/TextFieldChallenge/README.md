# Practice React Context by Building a TextField Component Using Composition

Challenge URL: https://reactpractice.dev/exercise/practice-react-context-by-building-a-textfield-component-using-composition/

Build a `TextField` component that allows users to add a `Label` and `Input` to a form:

```tsx
<TextField>
  <Label>First name</Label>
  <Input />
</TextField>
```

This is inspired by the React-Aria `TextField` component and the Shadcn `FormItem` component.

The component should link the `Label` and the `Input` by generating a unique id with the `useId` React hook and adding the HTML `for` attribute to the label.
