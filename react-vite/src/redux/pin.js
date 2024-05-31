const LOAD_PINS = "pins/LOAD_PINS";
const LOAD_INDV_PIN = "pins/LOAD_INDV_PIN";
const LOAD_USER_PINS = "pins/LOAD_USER_PINS";
const CREATE_PIN = "pins/CREATE_PIN";
const UPDATE_PIN = "pins/UPDATE_PIN";
const DELETE_PIN = "pins/DELETE_PIN";

const loadPins = (pins) => ({
  type: LOAD_PINS,
  pins,
});

const loadIndvPin = (pin) => ({
  type: LOAD_INDV_PIN,
  pin,
});

const loadUserPins = (pins) => ({
  type: LOAD_USER_PINS,
  pins,
});

const createPin = (pin) => ({
  type: CREATE_PIN,
  pin,
});

const updatePin = (pin) => ({
  type: UPDATE_PIN,
  pin,
});

const deletePin = (pin_id) => ({
  type: DELETE_PIN,
  pin_id,
});

// Load ALL Pins
export const loadPinsThunk = () => async (dispatch) => {
  const res = await fetch("/api/pins");
  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadPins(data));
  return data;
};

// Load Individual Pin
export const loadIndvPinThunk = (pin_id) => async (dispatch) => {
  const res = await fetch(`/api/pins/${pin_id}`);
  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadIndvPin(data));
  return data;
};

// Load User Pins
export const loadUserPinsThunk = (user_id) => async (dispatch) => {
  const res = await fetch(`/api/users/${user_id}/created`);
  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadUserPins(data));
  return data;
};

// Create a Pin
export const createPinThunk = (pin) => async (dispatch) => {
  const res = await fetch(`/api/pins/new`, {
    method: "POST",
    body: pin,
  });

  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(createPin(data));
  return data;
};

// Update Pin
export const updatePinThunk = (pin_id, pin) => async (dispatch) => {
  const res = await fetch(`/api/pins/${pin_id}`, {
    method: "PUT",
    body: pin,
  });

  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(updatePin(data));
  return data;
};

// Delete Pin
export const deletePinThunk = (pin_id) => async (dispatch) => {
  const res = await fetch(`/api/pins/${pin_id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(deletePin(pin_id));
};
