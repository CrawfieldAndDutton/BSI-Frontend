
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Transcript } from "@/lib/types";

interface CallTranscriptProps {
  transcript: Transcript;
}

export function CallTranscript({ transcript }: CallTranscriptProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-medium">Call Details</h3>
          <p className="text-sm text-muted-foreground">
            {transcript.date} • {transcript.time}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Agent: </span>
          <span className="text-sm">{transcript.agent}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Overall Sentiment: </span>
          <Badge variant="outline">{transcript.sentiment}</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {transcript.transcript.map((line, index) => (
          <Card key={index} className={`p-3 ${line.speaker === 'Agent' ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs font-semibold ${line.speaker === 'Agent' ? 'text-blue-600' : 'text-green-600'}`}>
                {line.speaker}
              </span>
              <span className="text-xs text-gray-500">{line.time}</span>
            </div>
            <p className="text-sm">{line.text}</p>
            <div className="flex justify-end mt-1">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  line.sentiment === 'Positive' ? 'text-green-600 bg-green-50' :
                  line.sentiment === 'Negative' ? 'text-red-600 bg-red-50' :
                  'text-gray-600 bg-gray-50'
                }`}
              >
                {line.sentiment}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
