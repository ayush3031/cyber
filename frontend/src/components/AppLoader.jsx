
import { Loader } from "@mantine/core";

export default function AppLoader() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px"
    }}>
      <Loader color="cyan" size="xl" variant="dots" />
    </div>
  );
}
