import { Form } from "../components/form";

const SignUp = () => {
    return (
        <main>
            <div className="container sign-up">
                <div className="left-con">
                    <h3 className="form-title">
                        Sign up and write your first article
                    </h3>
                    <Form style={{maxWidth:"400px"}}/>
                </div>
                <div className="right-con">
                    <img src="/01_moving_up 1.svg" alt="" />
                </div>
            </div>
        </main>
    );
};

export default SignUp;
