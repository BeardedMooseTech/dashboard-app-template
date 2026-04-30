import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export type tCheckProps = {
  svgProps: React.SVGProps<SVGSVGElement>;
};

const Check: React.FC<tCheckProps> = ({ svgProps }) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export type tDonutChartNextProps = {
  productName: string;
  manufacturingOrder: string;
  goal?: number;
  done?: number;
  demo?: boolean;
  alt?: boolean;
};

const RING_RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const DEMO_DURATION = 7000;
const DEMO_REPEAT_DELAY = 5000;

const DonutChartNext: React.FC<tDonutChartNextProps> = ({
  productName,
  manufacturingOrder,
  goal = 0,
  done = 0,
  demo = false,
  alt,
}) => {
  const effectiveGoal = demo ? 100 : goal;
  const [demoDone, setDemoDone] = useState(0);
  const effectiveDone = demo ? demoDone : done;
  const percentage = effectiveGoal > 0 ? (effectiveDone / effectiveGoal) * 100 : 0;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!demo) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = () => {
      setDemoDone(0);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DEMO_DURATION, 1);
        setDemoDone(t * 125);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          timeoutId = setTimeout(run, DEMO_REPEAT_DELAY);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    run();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutId);
    };
  }, [demo]);

  const clampedPct = Math.min(100, Math.max(0, percentage));
  const offset = CIRCUMFERENCE * (1 - clampedPct / 100);
  const overagePct = Math.max(0, percentage - 100);
  const overageOffset = CIRCUMFERENCE * (1 - Math.min(overagePct, 100) / 100);
  return (
    <svg
      version="1.1"
      width={600}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={alt ? styles.themeAlt : styles.themeDefault}
    >
      <g id="title" transform="translate(-2, -62)">
        <defs>
          <path id="title-curve" d="M 65 150 Q 260 0 460 165" fill="none" />
        </defs>

        <text fontSize="21">
          <textPath href="#title-curve" startOffset="50%" textAnchor="middle">
            {productName}
          </textPath>
        </text>
      </g>
      <g transform="translate(0, 12)">
        <g id="donut-chart" transform="translate(-75, -75)">
          <g id="top-right">
            <path
              className={`${styles.section} ${styles.done}`}
              d="m 391.09287,319.37667 c -0.51291,-0.6875 -1.7437,-3.12336 -2.7351,-5.41302 -2.32582,-5.37153 -6.8112,-9.66006 -13.07725,-12.50331 -4.55356,-2.06619 -6.8081,-2.30316 -25.25,-2.65389 l -20.25,-0.38512 V 225.024 151.62667 h 7.90063 c 15.66963,0 39.97834,5.51271 57.36834,13.00995 38.65372,16.66452 70.36776,47.42609 88.17011,85.52208 9.1972,19.68146 15.56093,45.26873 15.56093,62.56734 v 7.90063 h -53.37756 c -41.53801,0 -53.5844,-0.27726 -54.3101,-1.25 z"
              id="doughballing"
            />
            <defs>
              <path
                id="curve-top-right"
                d="M 400 185 A 205 200 0 0 1 485 290"
                fill="none"
              />
            </defs>
            <text fontSize="18">
              <textPath
                href="#curve-top-right"
                startOffset="43%"
                textAnchor="middle"
              >
                Doughballing
              </textPath>
            </text>
            { true && (
              <Check
                svgProps={{
                  x: 365,
                  y: 230,
                }}
              />
            )}
          </g>
          <g id="bottom-right">
            <path
              className={`${styles.inProgress} ${styles.section}`}
              d="m 329.78052,426.37795 v -73.54594 l 20.25,-0.39545 c 18.40117,-0.35935 20.71729,-0.60304 25.36826,-2.66914 6.22848,-2.76688 10.44545,-7.00839 13.56182,-13.64075 l 2.34938,-5 53.73527,-0.25869 53.73528,-0.25868 v 7.90931 c 0,15.67813 -5.51104,39.98315 -13.00995,57.37703 -25.3249,58.74163 -83.58161,100.38428 -144.74006,103.46208 l -11.25,0.56616 z"
              id="proofing"
            />
            <defs>
              <path
                id="curve-bottom-right"
                d="M 385 490 A 215 210 0 0 0 485 380"
                fill="none"
              />
            </defs>
            <text fontSize="18">
              <textPath
                href="#curve-bottom-right"
                startOffset="43%"
                textAnchor="middle"
              >
                Proofing
              </textPath>
            </text>
            { false && (
              <Check
                svgProps={{
                  x: 365,
                  y: 375,
                }}
              />
            )}
          </g>
          <g id="bottom-left">
            <path
              className={`${styles.section}`}
              d="M 292.28052,497.6949 C 258.44096,491.71163 228.77925,476.74895 203.99547,453.16002 172.49711,423.1802 153.08791,382.38255 151.04904,341.86791 l -0.56658,-11.25876 53.8843,0.25876 53.88431,0.25876 2.34937,5 c 3.11638,6.63236 7.33334,10.87387 13.56182,13.64075 4.65096,2.0661 6.96708,2.30979 25.36826,2.66914 l 20.25,0.39545 v 73.39733 73.39733 l -8.75,-0.0818 c -4.8125,-0.045 -13.25,-0.87747 -18.75,-1.84995 z"
              id="stretching"
            />
            <defs>
              <path
                id="curve-bottom-left"
                d="M 150 290 A 176 190 0 0 0 451 438"
                fill="none"
              />
            </defs>
            <text fontSize="18">
              <textPath
                href="#curve-bottom-left"
                startOffset="43%"
                textAnchor="middle"
              >
                Stretching
              </textPath>
            </text>
            { false && (
              <Check
                svgProps={{
                  x: 220,
                  y: 375,
                }}
              />
            )}
          </g>
          <g id="top-left">
            <path
              className={`${styles.section}`}
              d="m 150.78053,312.73473 c 0,-15.67813 5.51104,-39.98315 13.00995,-57.37702 16.66451,-38.65372 47.42608,-70.36776 85.52206,-88.17011 19.68147,-9.1972 45.26874,-15.56093 62.56735,-15.56093 h 7.90063 v 73.39733 73.39733 l -20.25,0.39545 c -18.40118,0.35935 -20.7173,0.60304 -25.36826,2.66914 -6.22848,2.76688 -10.44544,7.00839 -13.56182,13.64075 l -2.34937,5 -53.73528,0.25869 -53.73526,0.25869 z"
              id="baking"
            />
            <defs>
              <path
                id="curve-top-left"
                d="M 180 280 A 95 130 0 0 1 255 185"
                fill="none"
              />
            </defs>
            <text fontSize="18">
              <textPath
                href="#curve-top-left"
                startOffset="57%"
                textAnchor="middle"
              >
                Baking
              </textPath>
            </text>
            { false && (
              <Check
                svgProps={{
                  x: 230,
                  y: 230,
                }}
              />
            )}
          </g>
        </g>

        <circle
          id="outer-ring"
          cx="250"
          cy="250"
          r="235"
          fill="transparent"
          strokeWidth="2"
          className={styles.ringDecor}
        />
        <circle
          id="dashed-ring"
          cx="250"
          cy="250"
          r="200"
          fill="transparent"
          strokeWidth="2"
          strokeDasharray="10,10"
          className={styles.ringDecor}
        />
        <circle
          r={RING_RADIUS}
          cx="250"
          cy="250"
          id="progress-ring"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90, 250, 250)"
          className={styles.progressRing}
        />
        {overagePct > 0 && (
          <circle
            r={RING_RADIUS}
            cx="250"
            cy="250"
            id="overage-ring"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={overageOffset}
            transform="rotate(-90, 250, 250)"
            className={styles.overageRing}
          />
        )}
        <text
          id="moNum"
          x="250"
          y="252.5"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
        >
          {manufacturingOrder}
        </text>
        {/* Goal Label */}
        <g id="goal-label" transform="translate(410, 100)">
          {/* Number */}
          <text id="goal" x="36" y="-36" textAnchor="middle" dominantBaseline="middle">
            {effectiveGoal}
          </text>

          {/* Label */}
          <text x="36" y="-20" textAnchor="middle" dominantBaseline="middle">
            Goal
          </text>
        </g>

        {/* Actual Label */}
        <g id="actual-label" transform="translate(60, 445)">
          {/* Number */}
          <text id="done" x="8.75" y="-8" textAnchor="middle" dominantBaseline="middle">
            {Math.round(effectiveDone)}
          </text>

          {/* Label */}
          <text x="8.75" y="10" textAnchor="middle" dominantBaseline="middle">
            Done
          </text>
        </g>
      </g>
    </svg>
  );
};

export default DonutChartNext;
