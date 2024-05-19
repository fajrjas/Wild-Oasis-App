import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // { cabinId: id }
  console.log(id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be delete");
  }

  return data;
}

export async function createEditCabin({ newCabinData: newCabin, id }) {
  // https://kakwrpkvygrmmclnxaib.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // console.log(id, "id inside the apiCabins");
  // console.log(newCabin, "newCabin value inside of apiCabins");

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // console.log(newCabin, "newCabin");
  // console.log(id, "id");
  // console.log(hasImagePath, "imagePath");

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const image = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1.Create/edit cabin
  let query = supabase.from("cabins");
  //  const { data, error } = await supabase.from("cabins")

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image }]);

  // B)EDIT
  if (id) query = query.update({ ...newCabin, image }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3.Delete the cbin If there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabins could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
