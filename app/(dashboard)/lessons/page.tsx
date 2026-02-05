"use client";

import { Button, Card, Progress, Tag, Breadcrumb } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RobotOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";

// Module progress items
const moduleItems = [
  { title: "Introduction to React Hooks", completed: true },
  { title: "useState Hook", completed: true },
  { title: "useEffect Hook", completed: false, active: true },
  { title: "Custom Hooks", completed: false },
  { title: "Advanced Patterns", completed: false },
];

export default function LessonsPage() {
  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { title: "React Fundamentals" },
              { title: "Lesson 3 of 5" },
            ]}
            className="text-muted-foreground"
          />
          <Tag color="blue" className="rounded-full!">
            15 min
          </Tag>
        </div>

        {/* Lesson Title */}
        <h1 className="text-3xl font-bold text-foreground mb-8">
          useEffect Hook
        </h1>

        {/* Lesson Content */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 32 } }}
        >
          <div className="prose max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              The useEffect Hook allows you to perform side effects in function
              components. It serves the same purpose as componentDidMount,
              componentDidUpdate, and componentWillUnmount combined in React
              class components.
            </p>

            <h2 className="text-xl font-semibold text-foreground mb-4">
              What are Side Effects?
            </h2>
            <p className="text-muted-foreground mb-4">
              Side effects are operations that affect something outside the
              scope of the function being executed. Common examples include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
              <li>Fetching data from an API</li>
              <li>Setting up subscriptions</li>
              <li>Manually changing the DOM</li>
              <li>Setting up timers</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mb-4">
              Basic Syntax
            </h2>
            <pre className="bg-slate-800 text-white p-4 rounded-xl overflow-x-auto mb-6">
              <code>{`import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Your side effect code here
    console.log('Component mounted!');
  }, []);
}`}</code>
            </pre>

            <h2 className="text-xl font-semibold text-foreground mb-4">
              Dependency Array
            </h2>
            <p className="text-muted-foreground mb-4">
              The second argument to useEffect is an array of dependencies. The
              effect will only re-run if one of the dependencies has changed.
            </p>
            <pre className="bg-slate-800 text-white p-4 rounded-xl overflow-x-auto mb-6">
              <code>{`useEffect(() => {
  // This runs only when 'count' changes
  document.title = \`You clicked \${count} times\`;
}, [count]);`}</code>
            </pre>

            <h2 className="text-xl font-semibold text-foreground mb-4">
              Cleanup Function
            </h2>
            <p className="text-muted-foreground mb-4">
              Effects can optionally return a cleanup function that React will
              run before the component unmounts or before re-running the effect.
            </p>
            <pre className="bg-slate-800 text-white p-4 rounded-xl overflow-x-auto mb-6">
              <code>{`useEffect(() => {
  const subscription = subscribeToData();

  return () => {
    // Cleanup
    subscription.unsubscribe();
  };
}, []);`}</code>
            </pre>

            {/* Key Takeaways */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                💡 Key Takeaways
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircleFilled className="text-green-500 mt-1" />
                  useEffect runs after every render by default
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleFilled className="text-green-500 mt-1" />
                  Use the dependency array to control when effects run
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleFilled className="text-green-500 mt-1" />
                  Always cleanup side effects to prevent memory leaks
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            icon={<ArrowLeftOutlined />}
            className="rounded-lg! border-border!"
          >
            Previous Lesson
          </Button>
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            className="rounded-lg! bg-linear-to-r! from-primary! to-secondary! border-0!"
          >
            Next Lesson
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-72 space-y-4">
        {/* Module Progress */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <h3 className="font-semibold text-foreground mb-4">
            Module Progress
          </h3>
          <div className="space-y-3">
            {moduleItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  item.active ? "bg-primary/10" : ""
                }`}
              >
                {item.completed ? (
                  <CheckCircleFilled className="text-green-500" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      item.active ? "border-primary" : "border-gray-300"
                    }`}
                  />
                )}
                <span
                  className={`text-sm ${
                    item.active
                      ? "text-primary font-medium"
                      : item.completed
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Tutor Button */}
        <Button
          type="primary"
          block
          size="large"
          icon={<RobotOutlined />}
          className="rounded-xl! bg-primary! h-12!"
        >
          Ask AI Tutor
        </Button>

        {/* Stats */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Module Progress
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  percent={40}
                  showInfo={false}
                  strokeColor="#4f46e5"
                  className="flex-1!"
                />
                <span className="text-sm font-medium">40%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Time Spent Today
              </p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ClockCircleOutlined className="text-primary" />
                45 minutes
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
