using System.IO;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace ContactManagerAPI.Services
{
    public class FirebaseService
    {
        public FirebaseService()
        {
            if (FirebaseApp.DefaultInstance == null)
            {
                var serviceAccountPath = "FirebaseCredentials/react-firebase-37768-firebase-adminsdk-44o03-5c975e74d1.json";
                var serviceAccount = File.ReadAllText(serviceAccountPath);
                var credential = GoogleCredential.FromJson(serviceAccount);

                FirebaseApp.Create(new AppOptions
                {
                    Credential = credential
                });
            }
        }
    }
}