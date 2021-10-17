import { useFormik } from "formik";
import React from "react";
import { usePostMessageToServerMutation } from "../../../../services/graphql/graphql";
import ValidationSchema from "./chatSchema";

interface Props {
    serverId: string;
}

export type UserInputType = {
    content: string;
};

const UserInput: React.FC<Props> = ({ serverId }) => {
    const [postMessage] = usePostMessageToServerMutation();
    const { handleSubmit, values, handleChange } = useFormik<UserInputType>({
        initialValues: {
            content: "",
        },
        onSubmit: async (values, { resetForm }) => {
            await postMessage({
                variables: { serverId, content: values.content },
            });
            resetForm({ values: { content: "" } });
        },
        validationSchema: ValidationSchema,
    });
    return (
        <div className="px-4 relative z-10">
            <div className="h-20 w-full bg-gray-darkest flex flex-col justify-center align-bottom">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-row justify-between bg-gray-dark rounded-md"
                >
                    <button className="text-2xl px-3">+</button>
                    <input
                        className="outline-none text-2xl px-3 py-3 w-full rounded-md font-small bg-gray-dark text-white"
                        autoComplete="off"
                        id="content"
                        name="content"
                        type="text"
                        placeholder="Message here"
                        onChange={handleChange}
                        value={values.content}
                    />
                </form>
            </div>
        </div>
    );
};

export default UserInput;
