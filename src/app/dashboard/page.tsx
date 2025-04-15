import Dashboard from '@/components/Dashboard';

const fetchUniversityData = async () => {
    const res = await fetch('http://universities.hipolabs.com/search?name=middle');
    return res.json();
};

const DashboardPage = async () => {
    const universities = await fetchUniversityData();
    return <Dashboard universities={universities} />;
};

export default DashboardPage;
