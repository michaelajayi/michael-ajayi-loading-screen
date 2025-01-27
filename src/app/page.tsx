import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  return (
    <LoadingScreen>
      <Hero />
    </LoadingScreen>
  );
}
