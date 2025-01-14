import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import cartReducer from './CartSlice';
import propertyReducer from './propertySlice';
import propertyAvailabilityReducer from './CheckAvailibility';
import paymentReducer from './PaymentSlice';
import testimonialsReducer from './TestimonialSlice';

// Import persist functionality
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Persistence configuration for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'] // Only persist these fields from auth state
};

// Persistence configuration for cart slice
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems', 'totalAmount'] // Only persist these fields from cart state
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Configure the store with performance optimizations
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    property: propertyReducer,
    propertyAvailability: propertyAvailabilityReducer,
    payment: paymentReducer,
    testimonials: testimonialsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates', 'auth.loginTime'],
      },
      // Disable immutable state invariant middleware in production
      immutableCheck: process.env.NODE_ENV === 'development',
      // Disable thunk middleware warnings
      thunk: {
        extraArgument: undefined,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Optional: Create a function to purge persisted state
export const purgeStore = () => {
  persistor.purge();
};

// Optional: Create a function to reset the store
export const resetStore = () => {
  store.dispatch({ type: 'RESET_STORE' });
};

export default store;

