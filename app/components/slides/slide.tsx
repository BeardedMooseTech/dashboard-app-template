import DonutChart from "../../components/donut-chart";
import Header from "../../components/header";

const slideStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  overflow: "auto",
};

const Slide: React.FC<{ title: string, content?: Array<any>, alt: boolean, children?: React.ReactNode }> = ({ title, content, alt, children }) => (
  <section className="h-full w-full">
    <Header title={title} alt={alt} />
    <div style={slideStyles} className="h-full w-full flex-1 flex justify-center items-center">
      {children ? children : content?.map((slide, index) => (
        <div key={index} className="flex-1 flex justify-center items-center">
          <DonutChart
            alt={alt}
            actual={27}
            expected={100}
            className="max-w-3xl w-full h-full"
            manufacturingOrder={`MO12345${index}`}
          />
        </div>
      ))}
    </div>
  </section>
);

export default Slide;
