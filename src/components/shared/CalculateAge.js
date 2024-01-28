  export default function calculateAge (dob) {
          const dateOfBirth = new Date(dob.current.value);
          const currentDate = new Date();
          let calculatedAge = currentDate.getFullYear() - dateOfBirth.getFullYear();

          // Subtract one from the age if the birthday hasn't occurred yet this year
          if (currentDate < new Date(currentDate.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate())) {
              calculatedAge--;
          }

          return calculatedAge;
      };
