import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { insuranceOptionSchema } from "../../schemas/insuranceOptionSchema";
import "./stripe.css";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function InsuranceOption() {
  const [insuranceOptionInfo, setInsuranceOptionInfo] = useState({
    cost: 0,
    termsOfAgreement: false,
  });
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState();
  const { state } = useLocation();
  useEffect(() => {
    if (state?.type === "ORDER_DETAILS_FOR_CART") {
      const orderCostPerItem =
        (state.payload.price / 100) * state.payload.rentalTime;
      const insuranceCostPerItemRounded =
        Math.round(orderCostPerItem * 0.1 * 100) / 100;
      const insuranceCost = (
        insuranceCostPerItemRounded * state.payload.quantity
      ).toFixed(2);

      setOrderInfo(state.payload);

      setInsuranceOptionInfo((prevState) => {
        let pd = { ...prevState };
        pd.cost = insuranceCost;
        return pd;
      });
    }
  }, [state]);

  const handleSubmit = (values) => {
    const orderForPayload = { ...orderInfo };
    orderForPayload.insuranceCost = Number(values.cost);
    const stateForPayload = {
      type: "ORDER_DETAILS_FOR_CART",
      payload: orderForPayload,
    };
    navigate("/products/stripe/cart/checkout", { state: stateForPayload });
  };

  const handleSkip = () => {
    const orderForPayload = { ...orderInfo };
    orderForPayload.insuranceCost = 0;
    const stateForPayload = {
      type: "ORDER_DETAILS_FOR_CART",
      payload: orderForPayload,
    };
    navigate("/products/stripe/cart/checkout", { state: stateForPayload });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-sm-12 justify-content-center">
          <Card className="w-100 h-100 success-card">
            <Formik
              enableReinitialize={true}
              initialValues={insuranceOptionInfo}
              onSubmit={handleSubmit}
              validationSchema={insuranceOptionSchema}
            >
              <Form>
                <div className="card-body bg-light pb-0">
                  <div className="mb-3 text-center">Damage Waiver</div>
                  <div className="mb-3">
                    <label className="cost" htmlFor="cost">
                      Insurance Cost
                    </label>
                    <div className="row">
                      <strong className="col-1 mt-1">$</strong>
                      <Field
                        className="form-control col"
                        name="cost"
                        id="cost"
                        disabled={true}
                        value={insuranceOptionInfo.cost}
                      ></Field>
                    </div>

                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="transferform-field-error"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="termsOfAgreement">
                      <Field
                        type="checkbox"
                        name="termsOfAgreement"
                        id="termsOfAgreement"
                      />
                      {"  "} I agree to the terms and conditions*
                    </label>
                    <ErrorMessage
                      name="termsOfAgreement"
                      component="div"
                      className="transferform-field-error"
                    />
                  </div>
                  <div className="row d-flex justify-content-center align-content-center">
                    <button
                      className="btn btn-primary d-block mt-3 mb-3 mx-1 justify-content-center"
                      type="submit"
                      name="submit"
                      style={{ width: "40%" }}
                    >
                      Add Insurance
                    </button>
                    <button
                      className="btn btn-warning d-block mt-3 mb-3 mx-1 justify-content-center"
                      type="button"
                      name="skip"
                      style={{ width: "40%" }}
                      onClick={handleSkip}
                    >
                      Proceed Without Insurance
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
}

InsuranceOption.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default InsuranceOption;
