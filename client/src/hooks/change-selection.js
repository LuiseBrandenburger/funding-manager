import { useState } from "react";

const useForm = () => {
    const [selectionMarketing, setSelectionMarketing] = useState(['2.01. Promotion Print',
        '2.02. Promotion Radio',
        '2.03. Promotion TV',
        '2.04. Promotion Online', 
        '2.05. Advertisements',
        '2.06. Online Marketing',
        '2.07. Other Marketing',
        '2.08. Press Releases, Biography', 
        '2.09. Internet presence',
        '2.10. Production Expenses', 
        '2.11. Shipping Expenses',
        '2.12. PR travel',
        '2.13. Video / Content Production', 
        '2.14. Product management',
        '2.15. Other',
        ]);
    const [selectionProduction, setSelectionProduction] = useState(['1.01. Studio Rental for Recording',
        '1.02. Studio Rental for Mixing',
        '1.03. Mastering',
        '1.04. Guest Musicians',
        '1.05. Producer',
        '1.05. Producer', 
        '1.07. Pressing Expenses (CD, Vinyl, Tapes)',
        '1.10. GEMA',
        '1.13. Artwork', 
        '1.14. Photography & Media', 
        '1.15. Composition Creation - Material Expenses',
        '1.16. Composition Creation - Fees',
        '1.17. Rehearsal - Material Expenses', 
        '1.18. Rehearsal - Fees', 
        '1.20. Other',
    ]);
    const [selectionTour, setSselectionMarketing] = useState(['3.01. Travel Expenses',
        '3.02. Vehicle Rental',
        '3.03. Fuel Expenses',
        '3.04. Toll, Ferry, Other Travel Expenses',
        '3.05. Musician\'s Salary',
        '3.06. Guest Musician\'s  Fees',
        '3.07. Crew Technician\'s  (Sound, Lighting, Merchandise)  Fees',
        '3.08. Tour Management',
        '3.09. Equipment Rental',
        '3.10. Booking Fees',
        '3.11. Rehearsals Fees',
        '3.12. Other',
        ]);


    let projectsList =
        projects.length > 0 &&
        projects.map((project, i) => {
            return (
                <option key={i} value={project.id}>
                    {project.name}
                </option>
            );
        }, this);



    const handleChange = (category) =>
        setUserInput({
            ...userInput,
            [target.name]: target.value,
        });

    return [userInput, handleChange];
};

export default useForm;
