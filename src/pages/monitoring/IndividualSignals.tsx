
import { MonitoringSignals } from "../customers/components/MonitoringSignals";

export default function IndividualSignals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Individual Monitoring Signals</h1>
      </div>
      <div className="stats-card">
        <MonitoringSignals />
      </div>
    </div>
  );
}
