import "./PlanScreen.css";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlanScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    })
                })
            })
    }, [user.uid])

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then(querySnapshot => {
                const products = {};
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection
                        ("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products);
            })
    }, [])

    // console.log(subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                // Show an error to your customer and inspect your Cloud Function logs in the Firebase console
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe(
                    'pk_test_51M9MfiEiCQhfE9tsVqkNBqZ6x2Bdn9CqO25VtlxvhlKRPqi4Hd6wpzdzu54OKfeCqHzz5ShuWKPZNFIx79drYlg600j1EG3RgD'
                );
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

    return (
        <div className="planScreen">
            {subscription &&
                <p>
                    Renewal date: {new Date(
                        subscription?.current_period_end * 1000).toLocaleDateString()}
                </p>}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if the users's subscription is active
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role);

                return (
                    <div key={productId} className={`${isCurrentPackage && "planScreen_plan--disabled"} planScreen_plan`}>
                        <div className="planScreen_info" >
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() =>
                            !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}

                            {/* Subscribe */}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen;
