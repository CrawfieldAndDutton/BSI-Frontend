// Chart-related types
export interface ChartData {
  name: string;
  value?: number;
  [key: string]: any;
}

// Add any other types here as needed

export interface Call {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  duration: string;
  agent: string;
  type: string;
  status: string;
  outcome?: string;
  sentiment?: string;
  notes?: string;
}

export interface TranscriptLine {
  speaker: string;
  text: string;
  time: string;
  sentiment: string;
}

export interface Transcript {
  id: string;
  date: string;
  time: string;
  agent: string;
  customer: string;
  sentiment: string;
  transcript: TranscriptLine[];
}
