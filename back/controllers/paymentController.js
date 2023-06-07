import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";
import axios from 'axios';

const createOrder = async (req, res) => {
  try {
    let carrito = req.body;

    const total = carrito.reduce((accum, item) => accum + (item.unit_amount.value * item.quantity), 0);

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total
          }
          // Da error al poner las líneas de pedido, debe faltar alguna propiedad.
          // items: carrito.map(item => ({
          //   name: item.name,
          //   quantity: item.quantity,
          //   unit_amount: {
          //     currency_code: item.unit_amount.currency_code,
          //     value: item.unit_amount.value
          //   }
          // }))
        }
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:8081/verificacion`,
        cancel_url: `http://localhost:8081/checkout`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const { data: {access_token} } = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET
        }
      }
    );

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Algo fue mal.");
  }
};

const captureOrder = async (req, res) => {
  const token = req.params['token'];

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    res.status(200).send({data: response.data.id, message: 'Pago aceptado'});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const cancelPayment = (req, res) => res.status(200).send({data: undefined, message: 'Pago cancelado'});

module.exports = {
  createOrder,
  captureOrder,
  cancelPayment
}
