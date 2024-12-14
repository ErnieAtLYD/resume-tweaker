import { useCallback, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ResumeInputProps {
  resume: string;
  setResume: Dispatch<SetStateAction<string>>;
  onNext: () => void;
}

export const ResumeInput = ({
  resume,
  setResume,
  onNext,
}: ResumeInputProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setResume(e.target.value);
    },
    [setResume]
  );

  const loadSampleData = async () => {
    try {
      const response = await fetch("/api/sample-resume");
      if (!response.ok) {
        throw new Error("Failed to load sample data");
      }
      const text = await response.text();
      setResume(text);
    } catch (error) {
      console.error("Error loading sample data:", error);
    }
  };

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      {isDevelopment && (
        <Button
          onClick={loadSampleData}
          className="absolute top-4 right-4"
          variant="outline"
        >
          Load Sample Resume
        </Button>
      )}
      <h1 className="text-2xl font-bold mb-4">Post Your Resume</h1>
      <Textarea
        value={resume}
        onChange={handleInputChange}
        placeholder="Enter your resume in markdown format..."
        className="w-full h-96 mb-4 p-2 border rounded"
        aria-label="Resume"
      />
      <Button onClick={onNext} disabled={!resume.trim()} className="px-4 py-2">
        Next
      </Button>
    </div>
  );
};
