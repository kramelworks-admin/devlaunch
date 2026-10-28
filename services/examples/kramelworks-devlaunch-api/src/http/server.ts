export function startServer(app: any, port: number) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}
