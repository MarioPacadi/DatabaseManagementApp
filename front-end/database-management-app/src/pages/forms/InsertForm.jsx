import useToastStore from "../../store/snackbar/ToastStore";
import GenerateForm from "../../components/forms/generateForm";
import useDataStore from "../../store/store";
import {useNavigate} from "react-router-dom";

const InsertForm = ({ DataType }) => {
    const {showInfoToast, showWarningToast, showErrorToast} = useToastStore();
    const { insertData } = useDataStore();

    const navigate=useNavigate();

    const handleSubmit = async (formData) => {
        try {
            if (!isFormDataValid(formData)) {
                showWarningToast("Insert", "Please fill in all required fields.");
                return;
            }

            showInfoToast("Insert", `Successful ${formData}`);
            console.log(formData);
            insertData(DataType, formData);
            navigate(`/${DataType.name.toString().toLowerCase()}s`);
        } catch (error) {
            // Handle error, maybe show an error message
            showErrorToast("Insert", `Error occurred: ${error}`);
        }
    };

    const isFormDataValid = (formData) => {
        for (const key in formData) {
            // Check if the field is required and if it's empty
            if (!formData[key]) {
                return false;
            }
        }
        return true;
    };


    // Check if DataType is a constructor
    return GenerateForm(new DataType({}), handleSubmit);
};

export default InsertForm;
