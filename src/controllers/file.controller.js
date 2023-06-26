import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import {GridFsStorage} from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
// Mongo URI
const mongoURI = "mongodb+srv://hiredhero:doan1uit@hiredhero.wuax1be.mongodb.net/";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs, gridfsBucket;

conn.once('open', () => {

  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });

  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});




const getFile = async (req, res) => {
 
  try {
    gfs.files.findOne( {filename : req.params.filename} , (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
    
      res.header('Content-Type', file.contentType);
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
  
      return res;
  
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }

};

const deleteFile = async (req, res) => {
  try {
  
    const obj_id = new mongoose.Types.ObjectId(req.params.id);
    
    gridfsBucket.delete( obj_id );

    res.send('file deleted successfully')

  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const FileController = {
    
    upload: async (req, res) => {
     
      res.send(req.file.id)
    },
 
    getFile,

    deleteFile,
}