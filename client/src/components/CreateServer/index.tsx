import { Form, Formik } from "formik";
import React from "react";
import { useCreateServerMutation } from "../../services/graphql/graphql";
import Button from "../shared/Button";
import { FormHeader } from "../shared/Form/FormHeader";
import { TextField } from "../shared/Form/TextField";
import CreateServerSchema from "./CreateServerSchema";

type Props = {
  handleClose: () => Promise<void>;
  toggleModal: () => void;
};

export interface CreateServerParams {
  serverName: string;
}

const CreateServer: React.FC<Props> = ({ handleClose, toggleModal }) => {
  const [createServer] = useCreateServerMutation();

  const handleSubmit = async (values: CreateServerParams) => {
    await createServer({ variables: { serverName: values.serverName } });
    await handleClose();
  };
  return (
    <div className="flex flex-col pt-5 w-80 sm:w-88">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-xl">Create your server</h2>
        <p className="text-sm text-gray-light text-center pt-2">
          Create a new server for you and your friends. If you mess up, then
          change it later.
        </p>
      </div>
      <Formik
        initialValues={{ serverName: "Shaggies Meme Shack" }}
        validationSchema={CreateServerSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form>
            <div className="px-5">
              <FormHeader error={errors.serverName} text="SERVERNAME" />
              <TextField name="serverName" type="serverName" theme="light" />
            </div>
            <div className="pb-5 rounded-b-lg bg-gray-100 mt-3 flex justify-center h-16 relative">
              <div className="absolute left-3 bottom-3 w-20">
                <Button type="button" color="transparent" onClick={toggleModal}>
                  Cancel
                </Button>
              </div>
              <div className="absolute right-3 bottom-3 w-20">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateServer;
