import { ErrorMessage, Field, Form, Formik } from "formik";
import UseFetchRoles from "../../hooks/UseFetchRoles";
import * as Yup from 'yup';

const UserCreateView = () => {
    const {roles} = UseFetchRoles()
    const initials = {email: "", password: "", firstname: "", lastname: "", role_id: ""}
    const schema = Yup.object({
        email: Yup.string()
           .email("Veuillez saisir une adresse email valide")
           .required("Veuillez saisir une adresse email"),
        lastname: Yup.string()
           .min(2, "Le nom doit contenir 2 caractères minimum")
           .required("Veuillez saisir le nom de l'utilisateur"),
        firstname: Yup.string()
           .min(2, "Le prénom doit contenir 2 caractères minimum")
           .required("Veuillez saisir le prénom de l'utilisateur"),
     });
  
  return (
    <div>
        <h1>Nouvel utilisateur</h1>
        <div>
        <Formik
            initialValues={initials}  // Valeurs initiales du formulaire
            validationSchema={schema}  // Schéma de validation
            /*onSubmit={async (values) => {
               try {
                  const response = await singup(values);  // Appel à l'API pour inscrire l'utilisateur
                  setLoggedUser(response.data);  // Enregistrement des données de l'utilisateur et du token en session
                  navigate("/listgames");  // Redirection vers la page d'accueil après l'inscription réussie
               } catch (error) {
                  const errorData = error?.response?.data?.message || "Erreur lors de l'inscription";  // Gestion des erreurs d'inscription
                  setErrorMessage(errorData);  // Affichage des erreurs
               }
            }} */
         >
            <Form>
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" id="email" />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">Nom</label>
                  <Field name="lastname" type="text" className="form-control" id="lastname" />
                  <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
               </div>
               <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">Prénom</label>
                  <Field name="firstname" type="text" className="form-control" id="firstname" />
                  <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
               </div>
               <div>
                {
                    roles.length > 0 && ( <>
                        <label htmlFor="role_id" className="form-label">Role</label>
                        <Field as="select" name="role_id" id="role_id" >
                            {
                                roles.map((role, index) => (
                                    <option key={index} value={role.id}>{role.name}</option>
                                ))
                            }
                        </Field></>
                    )
                }
               </div>
               <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-primary">Valider</button>
               </div>
            </Form>
         </Formik>
        </div>
    </div>
  )
}

export default UserCreateView