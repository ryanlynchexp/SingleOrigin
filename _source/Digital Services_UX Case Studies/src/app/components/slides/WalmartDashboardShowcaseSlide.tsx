import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, MapPin, TrendingUp, Activity, ChevronRight, Radio, Shield, Menu, Bell, User, LayoutGrid, Settings, HelpCircle, AlertTriangle, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface WalmartDashboardShowcaseSlideProps {
  title: string;
  subtitle: string;
}

export function WalmartDashboardShowcaseSlide({ title, subtitle }: WalmartDashboardShowcaseSlideProps) {
  const [selectedStoreId, setSelectedStoreId] = useState<number>(1);
  const [mobileView, setMobileView] = useState<'home' | 'incidents' | 'profile'>('incidents');
  
  // Disaster locations with coordinates (global positions on Earth map)
  const disasters = [
    { id: 1, store: '4829', city: 'New York, USA', status: 'critical', type: 'Power Outage', x: 28, y: 45, timeRemaining: '04:23' },
    { id: 2, store: '4156', city: 'Tokyo, Japan', status: 'pending', type: 'HVAC Failure', x: 85, y: 48, timeRemaining: null },
    { id: 3, store: '4203', city: 'London, UK', status: 'confirmed', type: 'Security System', x: 48, y: 38, timeRemaining: null },
    { id: 4, store: '4512', city: 'São Paulo, Brazil', status: 'critical', type: 'Fire Suppression', x: 35, y: 72, timeRemaining: '08:47' },
    { id: 5, store: '3891', city: 'Sydney, Australia', status: 'confirmed', type: 'Flood Damage', x: 88, y: 78, timeRemaining: null },
    { id: 6, store: '3204', city: 'Vancouver, Canada', status: 'pending', type: 'Generator Issue', x: 18, y: 38, timeRemaining: null },
    { id: 7, store: '2943', city: 'Mumbai, India', status: 'confirmed', type: 'Refrigeration', x: 68, y: 58, timeRemaining: null },
    { id: 8, store: '5123', city: 'Dubai, UAE', status: 'expected', type: 'Storm Warning', x: 60, y: 52, timeRemaining: null },
  ];

  // Critical alerts for timer component
  const criticalAlerts = disasters.filter(d => d.status === 'critical');

  // Get selected disaster
  const selectedDisaster = disasters.find(d => d.id === selectedStoreId) || disasters[0];

  // Dynamic incident data based on selected store
  const getIncidentData = (storeId: number) => {
    const incidentData: Record<number, {
      progress: number;
      currentStep: string;
      activities: Array<{ title: string; time: string; description: string; isInitial?: boolean }>;
    }> = {
      1: { // Store 4829 - Power Outage (Critical)
        progress: 60,
        currentStep: 'Team Dispatched',
        activities: [
          { title: 'Emergency team dispatched', time: '10:15 AM', description: 'Team Alpha-7 en route with backup generator. ETA 45 minutes.' },
          { title: 'Materials confirmed available', time: '09:45 AM', description: 'Backup generator unit secured from warehouse facility #12.' },
          { title: 'Vendor response received', time: '09:28 AM', description: 'Regional power company estimates 6-8 hours for grid restoration.' },
          { title: 'Initial assessment completed', time: '09:18 AM', description: 'Critical systems affected. Perishables at risk. Immediate action required.' },
          { title: 'Critical incident reported', time: '09:12 AM', description: 'Store manager reported complete power failure affecting all systems.', isInitial: true },
          { title: 'Automated alert triggered', time: '09:11 AM', description: 'System detected power anomaly and initiated emergency protocols.' },
        ]
      },
      4: { // Store 4512 - Fire Suppression (Critical)
        progress: 80,
        currentStep: 'On-Site Assessment',
        activities: [
          { title: 'Fire suppression system activated', time: '11:42 AM', description: 'Emergency sprinklers deployed successfully. No injuries reported.' },
          { title: 'Fire department cleared scene', time: '11:28 AM', description: 'Local fire department confirmed no active flames. Investigation ongoing.' },
          { title: 'Specialist team on-site', time: '11:15 AM', description: 'Fire safety engineers assessing system integrity and water damage.' },
          { title: 'Emergency response initiated', time: '10:55 AM', description: 'Store evacuated. All personnel accounted for and safe.', isInitial: true },
          { title: 'Fire alarm triggered', time: '10:53 AM', description: 'Automated fire detection system activated in warehouse section.' },
        ]
      },
      2: { // Store 4156 - HVAC Failure (Pending)
        progress: 20,
        currentStep: 'Vendor Confirmed',
        activities: [
          { title: 'Vendor confirmed availability', time: '14:22 PM', description: 'HVAC contractor scheduled for site visit within 2 hours.' },
          { title: 'Facility issue reported', time: '13:45 PM', description: 'Store manager noted rising temperatures in freezer sections.', isInitial: true },
          { title: 'Temperature monitoring active', time: '13:46 PM', description: 'System sensors tracking temperature changes every 5 minutes.' },
        ]
      },
      3: { // Store 4203 - Security System (Confirmed)
        progress: 40,
        currentStep: 'Materials Ordered',
        activities: [
          { title: 'Replacement parts ordered', time: '08:33 AM', description: 'Security camera modules expedited from regional supplier.' },
          { title: 'Temporary security measures', time: '08:15 AM', description: 'Additional security personnel deployed to affected entrances.' },
          { title: 'Security system malfunction', time: '07:52 AM', description: 'Three exterior cameras offline. Blind spots identified.', isInitial: true },
        ]
      },
      5: { // Store 3891 - Flood Damage (Confirmed)
        progress: 50,
        currentStep: 'Team Dispatched',
        activities: [
          { title: 'Water extraction crew deployed', time: '06:18 AM', description: 'Emergency restoration team en route with pumping equipment.' },
          { title: 'Damage assessment complete', time: '05:45 AM', description: 'Approximately 2,000 sq ft affected. Merchandise being relocated.' },
          { title: 'Flooding reported', time: '05:12 AM', description: 'Pipe burst in storage area. Water accumulation spreading.', isInitial: true },
        ]
      },
      6: { // Store 3204 - Generator Issue (Pending)
        progress: 15,
        currentStep: 'Reported',
        activities: [
          { title: 'Generator failure detected', time: '16:05 PM', description: 'Backup power system failed routine test. Primary power stable.', isInitial: true },
          { title: 'Maintenance team notified', time: '16:07 PM', description: 'Electrician scheduled for diagnostic review tomorrow morning.' },
        ]
      },
      7: { // Store 2943 - Refrigeration (Confirmed)
        progress: 45,
        currentStep: 'Materials Ordered',
        activities: [
          { title: 'Replacement compressor ordered', time: '12:28 PM', description: 'Critical refrigeration part expedited from manufacturer.' },
          { title: 'Temporary cooling deployed', time: '11:55 AM', description: 'Mobile refrigeration unit installed to preserve inventory.' },
          { title: 'Refrigeration unit failure', time: '11:22 AM', description: 'Primary cooling system for dairy section non-functional.', isInitial: true },
        ]
      },
      8: { // Store 5123 - Storm Warning (Expected)
        progress: 10,
        currentStep: 'Reported',
        activities: [
          { title: 'Storm preparation initiated', time: '09:30 AM', description: 'Store reinforcing outdoor fixtures and securing inventory.', isInitial: true },
          { title: 'Weather alert received', time: '09:15 AM', description: 'Meteorological service issued severe storm warning for region.' },
        ]
      },
    };

    return incidentData[storeId] || incidentData[1];
  };

  const currentIncidentData = getIncidentData(selectedStoreId);

  // Helper to calculate step completion for mobile view
  const getStepCompletion = () => {
    const steps = ['Reported', 'DRC Assigned', 'Vendor Confirmed', 'Team Dispatched', 'On-Site Assessment', 'Resolved'];
    const progressMap: Record<string, number> = {
      'Reported': 1,
      'Vendor Confirmed': 2,
      'Materials Ordered': 3,
      'Team Dispatched': 4,
      'On-Site Assessment': 5,
      'Resolved': 6
    };
    const currentStepIndex = progressMap[currentIncidentData.currentStep] || 0;
    return { completed: Math.min(currentStepIndex, 6), total: 6 };
  };

  const stepCompletion = getStepCompletion();

  // Get contact data based on selected store
  const getContactData = (storeId: number) => {
    const contactData: Record<number, { drcLead: { initials: string; name: string; status: string }; vendor?: { initials: string; name: string; eta: string } }> = {
      1: { // Store 4829 - Power Outage (Critical) - Progress 70
        drcLead: { initials: 'SM', name: 'S. Mitchell', status: 'Active' },
        vendor: { initials: 'PG', name: 'PowerGrid Inc', eta: 'ETA 45m' }
      },
      4: { // Store 4512 - Fire Suppression (Critical) - Progress 80
        drcLead: { initials: 'JC', name: 'J. Chen', status: 'Active' },
        vendor: { initials: 'FS', name: 'FireSafe Systems', eta: 'On-Site' }
      },
      2: { // Store 4156 - HVAC Failure (Pending) - Progress 20
        drcLead: { initials: 'DR', name: 'D. Rodriguez', status: 'Active' },
        // No vendor yet - progress only at 20%
      },
      3: { // Store 4203 - Security System (Confirmed) - Progress 40
        drcLead: { initials: 'AP', name: 'A. Patel', status: 'Active' },
        vendor: { initials: 'SS', name: 'SecureView Tech', eta: 'ETA 2hr' }
      },
      5: { // Store 3891 - Flood Damage (Confirmed) - Progress 50
        drcLead: { initials: 'MK', name: 'M. Kim', status: 'Active' },
        vendor: { initials: 'RR', name: 'RapidRestore', eta: 'ETA 1hr' }
      },
      6: { // Store 3204 - Generator Issue (Pending) - Progress 15
        drcLead: { initials: 'TW', name: 'T. Williams', status: 'Active' },
        // No vendor yet - progress only at 15%
      },
      7: { // Store 2943 - Refrigeration (Confirmed) - Progress 45
        drcLead: { initials: 'LB', name: 'L. Brown', status: 'Active' },
        vendor: { initials: 'CC', name: 'CoolCore HVAC', eta: 'ETA 3hr' }
      },
      8: { // Store 5123 - Storm Warning (Expected) - Progress 10
        drcLead: { initials: 'NH', name: 'N. Harris', status: 'Monitoring' },
        // No vendor yet - progress only at 10%
      },
    };

    return contactData[storeId] || contactData[1];
  };

  const currentContactData = getContactData(selectedStoreId);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.05),transparent_50%)]" />
      
      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col p-10">
        {/* Slide Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">{title}</h2>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>

        {/* Dashboard Frame - Desktop + Mobile */}
        <div className="flex-1 flex items-start justify-center gap-8 pt-4">
          
          {/* Mobile View - Store Manager */}
          <div className="flex flex-col items-center gap-3 w-1/4">
            <p className="text-xs font-semibold text-slate-400">Store Manager View</p>
            
            {/* Mobile Phone Frame */}
            <div className="h-[500px] w-auto bg-[#0a0a0a] rounded-[28px] border-4 border-slate-800 shadow-2xl overflow-hidden relative" style={{
              aspectRatio: '200/420',
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}>
              
              {/* Mobile Screen Content */}
              <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col relative">
                
                {/* Mobile Header */}
                <div className="h-14 bg-[#0f0f0f] border-b border-white/10 flex items-end pb-2 px-4 flex-shrink-0">
                  <div className="flex items-center justify-between w-full">
                    {mobileView === 'incidents' && (
                      <>
                        <div>
                          <p className="text-[8px] text-slate-600 mb-0.5">Store #{selectedDisaster.store}</p>
                          <p className="text-xs font-semibold text-white">{selectedDisaster.type}</p>
                        </div>
                        {selectedDisaster.timeRemaining && (
                          <div className={`px-2 py-1 rounded ${
                            selectedDisaster.status === 'critical' ? 'bg-red-500/10' : 'bg-amber-500/10'
                          }`}>
                            <span className={`text-[8px] font-mono ${
                              selectedDisaster.status === 'critical' ? 'text-red-400' : 'text-amber-400'
                            }`}>{selectedDisaster.timeRemaining}</span>
                          </div>
                        )}
                      </>
                    )}
                    {mobileView === 'home' && (
                      <div>
                        <p className="text-[8px] text-slate-600 mb-0.5">DRC Dashboard</p>
                        <p className="text-xs font-semibold text-white">Home</p>
                      </div>
                    )}
                    {mobileView === 'profile' && (
                      <div>
                        <p className="text-[8px] text-slate-600 mb-0.5">Account</p>
                        <p className="text-xs font-semibold text-white">My Profile</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="flex-1 flex flex-col">

                  {/* Content based on selected view */}
                  {mobileView === 'incidents' && (
                    <div className="flex-1 px-4 pt-3 pb-2 space-y-2.5">
                    
                    {/* Resolution Timeline */}
                    <div>
                      <div className="flex items-end justify-between mb-1.5">
                        <p className="text-[9px] text-slate-500">Resolution Status</p>
                        <p className="text-xs font-bold text-white">{stepCompletion.completed} of {stepCompletion.total}</p>
                      </div>
                      
                      <div className="space-y-1">
                        {/* Step 1: Reported */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${currentIncidentData.progress >= 10 ? 'bg-blue-400' : 'bg-white/10'}`} />
                            <div className={`w-px h-3 ${currentIncidentData.progress >= 10 ? 'bg-blue-400/30' : 'bg-white/5'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <div className="flex items-baseline justify-between">
                              <span className={`text-[9px] ${currentIncidentData.progress >= 10 ? 'text-slate-400' : 'text-slate-700'}`}>Reported</span>
                              {currentIncidentData.activities.length > 0 && (
                                <span className="text-[7px] font-mono text-slate-600">{currentIncidentData.activities[currentIncidentData.activities.length - 1].time}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 2: DRC Assigned */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${currentIncidentData.progress >= 15 ? 'bg-blue-400' : 'bg-white/10'}`} />
                            <div className={`w-px h-3 ${currentIncidentData.progress >= 15 ? 'bg-blue-400/30' : 'bg-white/5'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <span className={`text-[9px] ${currentIncidentData.progress >= 15 ? 'text-slate-400' : 'text-slate-700'}`}>DRC Assigned</span>
                          </div>
                        </div>
                        
                        {/* Step 3: Vendor Confirmed */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              currentIncidentData.progress >= 40 ? 'bg-blue-400' : 
                              currentIncidentData.currentStep === 'Vendor Confirmed' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' :
                              'bg-white/10'
                            }`} />
                            <div className={`w-px h-3 ${currentIncidentData.progress >= 40 ? 'bg-blue-400/30' : 'bg-white/5'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <span className={`text-[9px] ${
                              currentIncidentData.progress >= 40 ? 'text-slate-400' :
                              currentIncidentData.currentStep === 'Vendor Confirmed' ? 'text-white' :
                              'text-slate-700'
                            }`}>Vendor Confirmed</span>
                          </div>
                        </div>
                        
                        {/* Step 4: Team Dispatched */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              currentIncidentData.progress >= 60 ? 'bg-blue-400' : 
                              currentIncidentData.currentStep === 'Team Dispatched' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' :
                              'bg-white/10'
                            }`} />
                            <div className={`w-px h-3 ${currentIncidentData.progress >= 60 ? 'bg-blue-400/30' : 'bg-white/5'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <span className={`text-[9px] ${
                              currentIncidentData.progress >= 60 ? 'text-slate-400' :
                              currentIncidentData.currentStep === 'Team Dispatched' ? 'text-white' :
                              'text-slate-700'
                            }`}>Team Dispatched</span>
                          </div>
                        </div>
                        
                        {/* Step 5: On-Site Assessment */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              currentIncidentData.progress >= 80 ? 'bg-blue-400' : 
                              currentIncidentData.currentStep === 'On-Site Assessment' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' :
                              'bg-white/10'
                            }`} />
                            <div className={`w-px h-3 ${currentIncidentData.progress >= 80 ? 'bg-blue-400/30' : 'bg-white/5'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <span className={`text-[9px] ${
                              currentIncidentData.progress >= 80 ? 'text-slate-400' :
                              currentIncidentData.currentStep === 'On-Site Assessment' ? 'text-white' :
                              'text-slate-700'
                            }`}>On-Site Repair</span>
                          </div>
                        </div>
                        
                        {/* Step 6: Resolved */}
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center pt-[3px]">
                            <div className={`w-1.5 h-1.5 rounded-full ${currentIncidentData.progress >= 100 ? 'bg-blue-400' : 'bg-white/10'}`} />
                          </div>
                          <div className="flex-1 leading-[9px]">
                            <span className={`text-[9px] ${currentIncidentData.progress >= 100 ? 'text-slate-400' : 'text-slate-700'}`}>Resolved</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Team Contacts */}
                    <div className="space-y-2 pt-1.5 border-t border-white/5">
                      {/* DRC Lead */}
                      <div>
                        <p className="text-[8px] text-slate-500 mb-1.5">DRC Lead</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-[9px] font-semibold text-blue-400">{currentContactData.drcLead.initials}</span>
                            </div>
                            <div>
                              <p className="text-[10px] text-white font-medium leading-tight">{currentContactData.drcLead.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <div className={`w-1 h-1 rounded-full ${
                                  currentContactData.drcLead.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                                }`} />
                                <span className="text-[8px] text-slate-500">{currentContactData.drcLead.status}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-slate-400 hover:text-slate-300 transition-colors">
                              <Phone className="w-3 h-3" />
                            </button>
                            <button className="text-slate-400 hover:text-slate-300 transition-colors">
                              <Mail className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Vendor - Only show if progress >= 40 (Vendor Confirmed step) */}
                      {currentContactData.vendor && currentIncidentData.progress >= 40 && (
                        <div>
                          <p className="text-[8px] text-slate-500 mb-1.5">Assigned Vendor</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-[9px] font-semibold text-amber-400">{currentContactData.vendor.initials}</span>
                              </div>
                              <div>
                                <p className="text-[10px] text-white font-medium leading-tight">{currentContactData.vendor.name}</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Clock className="w-2 h-2 text-slate-500" />
                                  <span className="text-[8px] text-slate-500">{currentContactData.vendor.eta}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-slate-400 hover:text-slate-300 transition-colors">
                                <Phone className="w-3 h-3" />
                              </button>
                              <button className="text-slate-400 hover:text-slate-300 transition-colors">
                                <Mail className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    </div>
                  )}

                  {/* Home View */}
                  {mobileView === 'home' && (
                    <div className="flex-1 px-4 pt-3 pb-2">
                      <p className="text-[9px] text-slate-500 mb-3 uppercase tracking-wide">Quick Actions</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white mb-0.5">8</p>
                            <p className="text-[8px] text-slate-400">Active Incidents</p>
                          </div>
                          <AlertTriangle className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white mb-0.5">12</p>
                            <p className="text-[8px] text-slate-400">Resolved Today</p>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                      </div>

                      <p className="text-[9px] text-slate-500 mb-2 uppercase tracking-wide">Recent Updates</p>
                      <div className="space-y-2">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-[10px] font-semibold text-white">Store #4829 Update</p>
                            <span className="text-[7px] text-slate-600 font-mono">10:15 AM</span>
                          </div>
                          <p className="text-[8px] text-slate-400 leading-relaxed">Emergency team dispatched with backup generator</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-[10px] font-semibold text-white">Store #4512 Update</p>
                            <span className="text-[7px] text-slate-600 font-mono">11:42 AM</span>
                          </div>
                          <p className="text-[8px] text-slate-400 leading-relaxed">Fire suppression system activated successfully</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-[10px] font-semibold text-white">Store #4156 Update</p>
                            <span className="text-[7px] text-slate-600 font-mono">14:22 PM</span>
                          </div>
                          <p className="text-[8px] text-slate-400 leading-relaxed">HVAC vendor confirmed and en route</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Profile View */}
                  {mobileView === 'profile' && (
                    <div className="flex-1 px-4 pt-3 pb-2">
                      {/* User Profile Header */}
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-white">JD</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white mb-0.5">John Davis</p>
                          <p className="text-[8px] text-slate-400">Store Manager</p>
                          <p className="text-[8px] text-slate-500">Store #4829</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <p className="text-[9px] text-slate-500 mb-2 uppercase tracking-wide">Performance</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <p className="text-[8px] text-slate-500 mb-1">Incidents Managed</p>
                          <p className="text-sm font-bold text-white">127</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <p className="text-[8px] text-slate-500 mb-1">Avg Response Time</p>
                          <p className="text-sm font-bold text-emerald-400">8.2m</p>
                        </div>
                      </div>

                      {/* Settings */}
                      <p className="text-[9px] text-slate-500 mb-2 uppercase tracking-wide">Settings</p>
                      <div className="space-y-1.5">
                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2.5 flex items-center justify-between transition-colors">
                          <span className="text-[10px] text-white">Notifications</span>
                          <Bell className="w-3 h-3 text-slate-400" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2.5 flex items-center justify-between transition-colors">
                          <span className="text-[10px] text-white">Account Settings</span>
                          <Settings className="w-3 h-3 text-slate-400" />
                        </button>
                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2.5 flex items-center justify-between transition-colors">
                          <span className="text-[10px] text-white">Help & Support</span>
                          <HelpCircle className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Mobile Bottom Nav */}
                <div className="h-12 bg-[#0f0f0f] border-t border-white/10 flex items-center justify-around flex-shrink-0">
                  <button
                    className="flex flex-col items-center gap-0.5"
                    onClick={() => setMobileView('home')}
                  >
                    <LayoutGrid className={`w-4 h-4 ${mobileView === 'home' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`text-[7px] ${mobileView === 'home' ? 'text-white' : 'text-slate-500'}`}>Home</span>
                  </button>
                  <button
                    className="flex flex-col items-center gap-0.5"
                    onClick={() => setMobileView('incidents')}
                  >
                    <AlertTriangle className={`w-4 h-4 ${mobileView === 'incidents' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`text-[7px] ${mobileView === 'incidents' ? 'text-white' : 'text-slate-500'}`}>Incidents</span>
                  </button>
                  <button
                    className="flex flex-col items-center gap-0.5"
                    onClick={() => setMobileView('profile')}
                  >
                    <User className={`w-4 h-4 ${mobileView === 'profile' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`text-[7px] ${mobileView === 'profile' ? 'text-white' : 'text-slate-500'}`}>Profile</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Desktop Dashboard */}
          <div className="flex flex-col items-center gap-3 w-3/4">
            <p className="text-xs font-semibold text-slate-400">Call Center View</p>
            
            <div className="w-full h-[65vh] bg-[#0d0d0d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex" style={{
              boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
            }}>
            
            {/* Condensed Sidebar */}
            <div className="w-14 bg-[#0a0a0a] border-r border-white/10 flex flex-col items-center py-4 gap-2">
              {/* Logo */}
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Shield className="w-4 h-4 text-slate-400" />
              </div>
              
              {/* Nav Icons */}
              <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/15 transition-colors">
                <LayoutGrid className="w-4 h-4 text-white" />
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                <MapPin className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                <Activity className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                <Settings className="w-4 h-4 text-slate-500" />
              </button>
              
              {/* Spacer */}
              <div className="flex-1" />
              
              {/* Bottom Icons */}
              <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                <HelpCircle className="w-4 h-4 text-slate-500" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] text-slate-400 font-semibold">
                JD
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="flex-1 flex flex-col min-w-0">
              
              {/* Condensed Header */}
              <div className="h-12 bg-[#0f0f0f] border-b border-white/10 px-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-white">Disaster Recovery Center</h3>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-slate-500">Live</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-500">Updated 12s ago</div>
                  <button className="relative w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
                    <Bell className="w-4 h-4 text-slate-400" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-[#0f0f0f]" />
                  </button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 p-6 min-h-0">
                
                {/* Main Grid Layout */}
                <div className="h-full grid grid-cols-12 gap-4 min-h-0">
                  
                  {/* Left Column: Critical Timer + Stats - 4 cols */}
                  <div className="col-span-4 flex flex-col gap-3 min-h-0">
                    
                    {/* Critical Alerts Timer */}
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 flex-shrink-0">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold text-white">Critical Alerts</p>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      </div>
                      
                      {/* Critical Alert List */}
                      <div className="space-y-2">
                        {criticalAlerts.map((alert) => (
                          <div 
                            key={alert.id}
                            onClick={() => setSelectedStoreId(alert.id)}
                            className={`border-l-2 pl-3 pr-2 py-2 transition-all cursor-pointer ${
                              alert.id === selectedStoreId
                                ? 'bg-white/[0.06] border-red-400' 
                                : 'bg-white/[0.02] border-red-500 hover:bg-white/[0.04] hover:border-red-400'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-white">Store #{alert.store}</span>
                              <span className="text-xs font-mono font-bold text-red-400">{alert.timeRemaining}</span>
                            </div>
                            <p className="text-[10px] text-slate-400">{alert.city} · {alert.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Incident Card */}
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Selected Incident</p>
                            <p className="text-lg font-bold text-white leading-none">Store #{selectedDisaster.store}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-md ${
                          selectedDisaster.status === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                          selectedDisaster.status === 'confirmed' ? 'bg-blue-500/10 border border-blue-500/20' :
                          selectedDisaster.status === 'pending' ? 'bg-amber-500/10 border border-amber-500/20' :
                          'bg-purple-500/10 border border-purple-500/20'
                        }`}>
                          <span className={`text-[10px] font-bold ${
                            selectedDisaster.status === 'critical' ? 'text-red-400' :
                            selectedDisaster.status === 'confirmed' ? 'text-blue-400' :
                            selectedDisaster.status === 'pending' ? 'text-amber-400' :
                            'text-purple-400'
                          }`}>{selectedDisaster.status.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Incident Details */}
                      <div className="mb-4 pb-4 border-b border-white/10 flex-shrink-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Location</span>
                            <span className="text-white font-medium">{selectedDisaster.city}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Type</span>
                            <span className="text-white font-medium">{selectedDisaster.type}</span>
                          </div>
                          {selectedDisaster.timeRemaining && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">Time Remaining</span>
                              <span className="text-red-400 font-mono font-bold">{selectedDisaster.timeRemaining}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Tracker */}
                      <div className="mb-4 pb-4 border-b border-white/10 flex-shrink-0">
                        <p className="text-xs font-bold text-white mb-3">Resolution Progress</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${currentIncidentData.progress}%` }} />
                          </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="space-y-2">
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 20 ? 'opacity-40' : ''}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            <span className="text-[10px] text-slate-400">Reported</span>
                          </div>
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 40 ? 'opacity-40' : ''}`}>
                            {currentIncidentData.progress >= 40 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            ) : currentIncidentData.currentStep === 'Vendor Confirmed' ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <span className={`text-[10px] ${currentIncidentData.currentStep === 'Vendor Confirmed' ? 'text-white font-semibold' : 'text-slate-400'}`}>Vendor Confirmed</span>
                          </div>
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 50 ? 'opacity-40' : ''}`}>
                            {currentIncidentData.progress >= 50 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            ) : currentIncidentData.currentStep === 'Materials Ordered' ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <span className={`text-[10px] ${currentIncidentData.currentStep === 'Materials Ordered' ? 'text-white font-semibold' : 'text-slate-400'}`}>Materials Ordered</span>
                          </div>
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 60 ? 'opacity-40' : ''}`}>
                            {currentIncidentData.progress >= 60 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            ) : currentIncidentData.currentStep === 'Team Dispatched' ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <span className={`text-[10px] ${currentIncidentData.currentStep === 'Team Dispatched' ? 'text-white font-semibold' : 'text-slate-400'}`}>Team Dispatched</span>
                          </div>
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 80 ? 'opacity-40' : ''}`}>
                            {currentIncidentData.progress >= 80 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            ) : currentIncidentData.currentStep === 'On-Site Assessment' ? (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <span className={`text-[10px] ${currentIncidentData.currentStep === 'On-Site Assessment' ? 'text-white font-semibold' : 'text-slate-600'}`}>On-Site Assessment</span>
                          </div>
                          <div className={`flex items-center gap-2 ${currentIncidentData.progress < 100 ? 'opacity-40' : ''}`}>
                            {currentIncidentData.progress >= 100 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                            )}
                            <span className="text-[10px] text-slate-600">Resolved</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Log */}
                      <div className="flex-1 min-h-0 flex flex-col">
                        <p className="text-xs font-bold text-white mb-3 flex-shrink-0">Recent Activity</p>
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
                          {currentIncidentData.activities.map((activity, index) => (
                            <div key={index} className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 hover:bg-white/[0.04] transition-colors">
                              <div className="flex items-start justify-between mb-1">
                                <span className={`text-[10px] font-semibold ${activity.isInitial ? 'text-red-400' : 'text-white'}`}>{activity.title}</span>
                                <span className="text-[9px] text-slate-600 font-mono">{activity.time}</span>
                              </div>
                              <p className="text-[9px] text-slate-500 leading-relaxed">{activity.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Center: USA Map Visualization - 8 cols */}
                  <div className="col-span-8 bg-[#1a1a1a] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex flex-col min-h-0 overflow-visible">
                    
                    {/* Map Header */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white leading-none mb-1">National Incident Map</h3>
                          <p className="text-xs text-slate-500">Real-time disaster tracking across all locations</p>
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs text-slate-400">Critical</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-xs text-slate-400">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-xs text-slate-400">Pending</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="text-xs text-slate-400">Expected</span>
                        </div>
                      </div>
                    </div>

                    {/* USA Map Container - takes remaining space */}
                    <div className="relative flex-1 bg-gradient-to-b from-slate-950/50 to-slate-900/30 rounded-xl border border-white/5 min-h-0">
                      
                      {/* Selected Store Chip - Top Left */}
                      {selectedDisaster && (
                        <div className="absolute top-3 left-3 z-[100] flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-xl">
                          <div 
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                            style={{ 
                              backgroundColor: selectedDisaster.status === 'critical' ? 'rgb(239, 68, 68)' :
                                selectedDisaster.status === 'confirmed' ? 'rgb(59, 130, 246)' :
                                selectedDisaster.status === 'pending' ? 'rgb(251, 191, 36)' :
                                'rgb(168, 85, 247)'
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">Store #{selectedDisaster.store}</span>
                                {selectedDisaster.timeRemaining && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-red-400" />
                                    <span className="text-[10px] font-mono font-bold text-red-400">{selectedDisaster.timeRemaining}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400">{selectedDisaster.city} • {selectedDisaster.type}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Map Image Background */}
                      <div className="absolute inset-0 opacity-60 overflow-hidden rounded-xl">
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOQVNBJTIwZWFydGglMjBuaWdodCUyMFVTQSUyMGxpZ2h0cyUyMHNhdGVsbGl0ZXxlbnwxfHx8fDE3Njk3MTU5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="USA Map"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/40 to-slate-950/70" />
                      </div>

                      {/* Grid overlay */}
                      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
                        {[...Array(10)].map((_, i) => (
                          <line
                            key={`v-${i}`}
                            x1={10 + i * 8}
                            y1="10"
                            x2={10 + i * 8}
                            y2="70"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="0.2"
                          />
                        ))}
                        {[...Array(7)].map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1="10"
                            y1={10 + i * 9}
                            x2="90"
                            y2={10 + i * 9}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="0.2"
                          />
                        ))}
                      </svg>

                      {/* Disaster Location Pins */}
                      {disasters.map((disaster) => {
                        const pinColor = 
                          disaster.status === 'critical' ? 'rgb(239, 68, 68)' :
                          disaster.status === 'confirmed' ? 'rgb(59, 130, 246)' :
                          disaster.status === 'pending' ? 'rgb(251, 191, 36)' :
                          'rgb(168, 85, 247)';
                        
                        const pulseAnimation = disaster.status === 'critical';
                        const isSelected = disaster.id === selectedStoreId;

                        return (
                          <div
                            key={disaster.id}
                            onClick={() => setSelectedStoreId(disaster.id)}
                            className="absolute group cursor-pointer"
                            style={{
                              left: `${disaster.x}%`,
                              top: `${disaster.y}%`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: isSelected ? 50 : 10,
                            }}
                          >
                            {/* Selection ring - larger and more prominent */}
                            {isSelected && (
                              <>
                                <div
                                  className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 opacity-60 z-10 animate-pulse"
                                  style={{ borderColor: pinColor, animationDuration: '2s' }}
                                />
                                <div
                                  className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border z-10"
                                  style={{ borderColor: pinColor, opacity: 0.3 }}
                                />
                              </>
                            )}
                            
                            {/* Pulse ring for critical */}
                            {pulseAnimation && (
                              <div
                                className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full opacity-75 animate-ping z-10"
                                style={{ backgroundColor: pinColor, animationDuration: '2s' }}
                              />
                            )}
                            
                            {/* Pin */}
                            <div
                              className={`relative rounded-full border-2 border-black/50 shadow-lg transition-transform group-hover:scale-125 z-20 ${
                                isSelected ? 'w-5 h-5 scale-110' : 'w-4 h-4'
                              }`}
                              style={{ backgroundColor: pinColor }}
                            >
                              <div className="absolute inset-1 rounded-full bg-white/40" />
                            </div>

                            {/* Tooltip on hover only (not when selected) */}
                            <div className={`absolute left-1/2 -translate-x-1/2 top-6 transition-opacity pointer-events-none z-[99] ${
                              isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                            }`}>
                              <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                                <div className="flex items-center justify-between gap-3 mb-1">
                                  <p className="text-xs font-bold text-white">Store #{disaster.store}</p>
                                  {disaster.timeRemaining && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-red-400" />
                                      <span className="text-[10px] font-mono font-bold text-red-400">{disaster.timeRemaining}</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 mb-1">{disaster.city}</p>
                                <p className="text-[10px] text-slate-300">{disaster.type}</p>
                                <div className="mt-1 pt-1 border-t border-white/10">
                                  <p className="text-[9px] text-slate-500 capitalize">{disaster.status}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Stats Below Map */}
                    <div className="grid grid-cols-4 gap-3 mt-4 flex-shrink-0">
                      <div className="bg-slate-950/50 border border-white/5 rounded-lg p-2.5">
                        <p className="text-xs text-slate-500 mb-1">Total Locations</p>
                        <p className="text-lg font-bold text-white leading-none">4,743</p>
                      </div>
                      <div className="bg-slate-950/50 border border-white/5 rounded-lg p-2.5">
                        <p className="text-xs text-slate-500 mb-1">Affected Stores</p>
                        <p className="text-lg font-bold text-red-400 leading-none">12</p>
                      </div>
                      <div className="bg-slate-950/50 border border-white/5 rounded-lg p-2.5">
                        <p className="text-xs text-slate-500 mb-1">Coverage</p>
                        <p className="text-lg font-bold text-white leading-none">100%</p>
                      </div>
                      <div className="bg-slate-950/50 border border-white/5 rounded-lg p-2.5">
                        <p className="text-xs text-slate-500 mb-1">Uptime</p>
                        <p className="text-lg font-bold text-emerald-400 leading-none">99.8%</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}