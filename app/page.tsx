"use client";
import { Suspense, useEffect, useState } from "react";
import DonutChartNext from "./components/donut-cart-next";
import { useSearchParams } from "next/navigation";
import Slide from "./components/slides/slide";
import dynamic from "next/dynamic";

const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

type WorkOrder = {
  id: number;
  name: string;
  state: string;
};

type MrpProduction = {
  id: number;
  name: string;
  state: string;
  mo_name: string;
  scanned_qty: number;
  qty_producing: number;
  product_id: {
    id: number;
    name: string;
    default_code: string;
  };
  workorder_ids: WorkOrder[];
};

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

function DevicesContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const isAltTheme = theme === "alt";
  const [mainClass, setMainClass] = useState("");
  const [productions, setProductions] = useState<MrpProduction[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadStyles = async () => {
      const styleModule = isAltTheme
        ? await import("./alt.module.css")
        : await import("./main.module.css");

      if (isMounted) {
        setMainClass(styleModule.default.main);
      }
    };

    loadStyles();

    return () => {
      isMounted = false;
    };
  }, [isAltTheme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboards", { method: "POST" });
        const json = await res.json();
        console.log("Fetched Productions:", json?.result?.MrpProduction);
        setProductions(json?.result?.MrpProduction ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    const refreshMs = Number(process.env.NEXT_PUBLIC_REFRESH_INTERVAL) || 30000;
    fetchData();
    const interval = setInterval(fetchData, refreshMs);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${mainClass} w-screen h-screen`}>
      {productions.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-2xl font-semibold opacity-60">No active Manufacturing Orders found</p>
        </div>
      )}
      {productions.length > 0 && (
        <Slides className="h-full w-full">
          {chunk(productions, 3).map((group, i) => (
            <Slide key={i} alt={isAltTheme} title="In Progress">
              {group.map((p) => (
                <DonutChartNext
                  key={p.id}
                  productName={p.product_id.name}
                  manufacturingOrder={p.name}
                  goal={p.qty_producing}
                  done={p.scanned_qty}
                  workorder_ids={p.workorder_ids}
                  alt={isAltTheme}
                />
              ))}
            </Slide>
          ))}
        </Slides>
      )}
    </div>
  );
}

export default function Devices() {
  return (
    <Suspense fallback={<div className="w-screen h-screen" />}>
      <DevicesContent />
    </Suspense>
  );
}
