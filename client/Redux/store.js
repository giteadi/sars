import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import cartReducer from './CartSlice';
import propertyReducer from './propertySlice';
import propertyAvailabilityReducer from './CheckAvailibility';
import paymentReducer from './PaymentSlice';
import testimonialsReducer from './TestimonialSlice'; 

// Import persist functionality
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Persistence configuration for auth slice
const authPersistConfig = {
  key: 'auth', 
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    cart: cartReducer,           
    property: propertyReducer,   
    propertyAvailability: propertyAvailabilityReducer,
    payment: paymentReducer,
    testimonials: testimonialsReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
