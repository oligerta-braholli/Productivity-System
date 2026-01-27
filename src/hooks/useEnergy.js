import useLocalStorage from './useLocalStorage';

function useEnergy() {
  const [energyLogs, setEnergyLogs] = useLocalStorage('energyLogs', []);

  const logEnergy = (level) => {
    const newLog = {
      id: Date.now(),
      level,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('sv-SE')
    };
    setEnergyLogs([...energyLogs, newLog]);
  };

  const getAverageEnergy = (days = 7) => {
    const now = new Date();
    const recentLogs = energyLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      const diffDays = (now - logDate) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });

    if (recentLogs.length === 0) return 0;
    
    const sum = recentLogs.reduce((acc, log) => acc + log.level, 0);
    return (sum / recentLogs.length).toFixed(1);
  };

  return {
    energyLogs,
    logEnergy,
    getAverageEnergy
  };
}

export default useEnergy;
